import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, AuthorizationStatus, StateAction } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, redirectToRoute, requireAuthorization, setLoadOffersStatus } from './actions';
import { toast } from 'react-toastify';

export const fetchOffersAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(StateAction.Offer.LoadOffers,
    async ( _arg, { dispatch, extra: api } ) => {
      const { data } = await api.get<Offer[]>(ApiRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setLoadOffersStatus(false));
    });

export const checkAuthAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(StateAction.User.CheckAuth,
    async ( _arg, { dispatch, extra: api } ) => {
      try {
        await api.get(ApiRoute.Login);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    });

export const loginAction = createAsyncThunk<void, AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    StateAction.User.Login,
    async ( { login: email, password }, { dispatch, extra: api } ) => {
      const {
        data: { token },
      } = await api.post<UserData>(ApiRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      toast.success('You successfully login');
    },
  );

export const logoutAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(StateAction.User.Logout,
    async ( _arg, { dispatch, extra: api } ) => {
      await api.delete(ApiRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    });
