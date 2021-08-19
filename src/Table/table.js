import ListComponent from "./list-component";
import StatusFilterComponent from "./status-filter-component";
import "./index.css";
import DatePickerComponent from '../DateFilter/date-picker';

export default function ListPage() {
  return (
    <div className="ui two column centered grid">
      <div class="row">
        <img
          class="ui medium image"
          src="http://lofrev.net/wp-content/photos/2017/05/Spacex_logo.png"
        />
      </div>

      <div class="column">
        <div class="row">
          <div class="ui grid">
            <div class="left floated six wide column">
            <DatePickerComponent />
            </div>
            <div class="right floated five wide column">
              <StatusFilterComponent />
            </div>
          </div>
        </div>
        <div class="row">
          <ListComponent />
        </div>
      </div>
    </div>
  );
}

