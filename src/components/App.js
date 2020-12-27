import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../hoc/ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import Loader from './Loader';
import avatarImg from './../images/profile__avatar.jpg';
import { signIn, signUp } from '../utils/constants';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isInfoTooltipPopup, setInfoTooltipPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [removableCard, setRemovableCard] = useState(null);
  const [isLoaderActive, setLoaderActive] = useState(true);

  const history = useHistory();

  //Дефолтная инициализация в случае невыполнения запроса к api.
  const [currentUser, setCurrentUser] = useState({
    avatar: avatarImg,
    name: 'Name',
    about: 'Information about you',
  });

  /**
   * Обработчик открытия попапа редактирования профиля.
   */
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  /**
   * Обработчик открытия попапа добавления карточки.
   */
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  /**
   * Обработчик открытия попапа редактирования аватара.
   */
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  /**
   * Обработчик закрытия попапов.
   */
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  const handleScreenClickClose = ({ target }) => {
    if (target.classList.contains('popup')) {
      closeAllPopups();
    }
  };

  /**
   * Обработчик клика по карточке.
   */
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteButtonClick = (card) => {
    setConfirmPopupOpen(true);
    setRemovableCard(card);
  };

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const res = await api.setUserInfo({ name, about });
      if (res) {
        setCurrentUser(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeAllPopups();
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const res = await api.updateUserAvatar(avatar);
      setLoaderActive(true);
      if (res) {
        setCurrentUser(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeAllPopups();
      setLoaderActive(false);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((like) => currentUser._id === like._id);

    try {
      const newCard = await api.changeLikeCardStatus(
        card._id,
        isLiked ? 'DELETE' : 'PUT'
      );
      if (newCard) {
        const newCards = cards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        );
        setCards(newCards);
      }
    } catch (err) {
      console.error(err);
    } finally {
      closeAllPopups();
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      closeAllPopups();
      setLoaderActive(true);

      const newCards = cards.filter(
        (currentCard) => currentCard._id !== card._id
      );

      setCards(newCards);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaderActive(false);
    }
  };

  const handleAddPlaceSubmit = async ({ name, link }) => {
    try {
      const newCard = await api.addCard({ name, link });
      closeAllPopups();
      setLoaderActive(true);

      if (newCard) {
        setCards([newCard, ...cards]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoaderActive(false);
    }
  };

  const handleAuthorization = async ({ password, email }) => {
    try {
      const res = await auth.authorize({ password, email });
      if (res) {
        setLoggedIn(true);
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegistration = async ({ password, email }) => {
    try {
      const res = await auth.register({ password, email });
      if (res) {
        history.push(signIn);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Отрисовка первоначальных данных при монтировании компонента.
   * (Promise.allSettled)
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataArray = await api.getAllInitialData();
        const [dataUser, dataCards] = dataArray.map((item) => item.value);

        if (dataUser) {
          setCurrentUser(dataUser);
        }

        if (dataCards) {
          setCards(dataCards);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoaderActive(false);
      }
    };

    fetchData();
  }, []);

  //Обработчик закрытия попапа по клику на Escape
  useEffect(() => {
    const handleEscClickClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscClickClose);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} email={email} />
          <Switch>
            <Route path={signIn}>
              <Login onAuthorization={handleAuthorization} />
            </Route>
            <Route path={signUp}>
              <Register onRegistration={handleRegistration} />
            </Route>
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              path="/"
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteButtonClick={handleDeleteButtonClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onScreenClickClose={handleScreenClickClose}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onScreenClickClose={handleScreenClickClose}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onScreenClickClose={handleScreenClickClose}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmDeleteCardPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onScreenClickClose={handleScreenClickClose}
            onDeleteCard={handleCardDelete}
            card={removableCard}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onScreenClickClose={handleScreenClickClose}
          />
          <InfoTooltip onClose={closeAllPopups} />
          {isLoaderActive && <Loader />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
