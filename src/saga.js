import { takeEvery, call, put } from 'redux-saga/effects';
import { DATA_REQUESTED, DATA_LOADED, API_ERRORED } from './actions';

export default function* watcherSaga() {
  yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga(action) {
  try {
    const payload = yield call(getData,action.name)
    yield put({ type: DATA_LOADED, payload })
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e })
  }
}

function getData(name) {
  console.log('Fetching remote articles.')
  return fetch(`http://localhost:3001/tweets?name=${name}`).then(response =>
    response.json()
  );
}