import {
  // アカウント登録
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  // ログイン
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  // ユーザー情報取得
  USER_SUCCESS,
  USER_FAIL,

  // リフレッシュトークン
  REFRESH_SUCCESS,
  REFRESH_FAIL,

  // ログアウト
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  // 認証チェック
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,

  // 読み込み中
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './types';

// アカウント登録
export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const body = JSON.stringify({
    name,
    email,
    password,
  });

  try {
    const res = await fetch('/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// ログイン
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    }

    // ユーザー情報取得
    dispatch(user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// ユーザー情報取得
export const user = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('/api/account/user', {
      method: 'GET',
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// リフレッシュトークン
export const refresh = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('/api/account/refresh', {
      method: 'GET',
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
        payload: data,
      });

      dispatch(verify());
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// 認証チェック
export const verify = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('/api/account/verify', {
      method: 'GET',
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      });

      dispatch(user());
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// ログアウト
export const logout = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch('/api/account/logout', {
      method: 'POST',
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });

      dispatch(user());
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};
