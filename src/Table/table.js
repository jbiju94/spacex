
import ListComponent from './list-component';
import FilterComponent from './filter-component';
import './index.css';

export default function ListPage() {
  return (
    <div className="Desktop1">
      <div className="Header">
        <img
          className="Logo"
          src="http://lofrev.net/wp-content/photos/2017/05/Spacex_logo.png"
        />
        <div className="Rectangle1" />
      </div>
      <div class="SubHeader">
        <FilterComponent />
      </div>
      <div className="Table">
        <ListComponent />
      </div>
    </div>
  );
}
