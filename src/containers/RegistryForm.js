import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addRecord, updateYear, selectYear } from "../actions/index";
import FormField from "../components/Field";
import { Comic, ComicFields } from "../classes/Comic";
import * as _ from "lodash";

class RegistryForm extends React.Component {
  fields;

  render() {
    this.fields = ComicFields().map((f, i) => <FormField Data={f} key={i} />);

    return (
      <div>
        <form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
          {this.fields}
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props, this.state);
    let recordObject = new Comic(this.fieldsValues());
    this.props.addRecord(recordObject)
      .then(r => {
        if (!r.error) {
          let year = recordObject.date.year();
          this.props.updateYear(year);
          this.forceUpdate(); // Reset form

          // To know if year-record repopulation is needed, lets take a
          // look into props.yearRecords and see if one is from same year
          if (_.first(this.props.yearRecords).date.year() === year) {
            this.props.selectYear(year);
          }
        } else {
          console.log("This record is already stored :(", r.payload.message)
        }
      });
  }

  fieldsValues() {
    let recordAttributes = {};
    this.fields.forEach(f => {
      recordAttributes[f.props.Data.id] = f.props.Data.value;
    });
    return recordAttributes;
  }

  afterSubmit() {
    this.updateRecords(true);
  }
}

function mapStateToProps(state) { // This is how React and Redux get glued!
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRecord, updateYear, selectYear }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistryForm);
