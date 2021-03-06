import './sccs/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Store} from '@core/createStore';
import {storage, debounce} from '@core/utils';
import {initialState, rootReducer} from '@/redux/rootReducer';

const store = new Store(rootReducer, initialState);

const stateListener = debounce( state => {
  console.log('App state:', state);
  storage('excel-state', state)
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
