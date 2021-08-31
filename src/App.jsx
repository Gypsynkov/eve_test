import React, { Component } from "react";
import "./App.css";
import EveService from "./services/eveservices";
import BlockName from "./BlockName";
import Modal from "./Modal";
import Header from "./Header";





class App extends Component  {
  eveService = new EveService();
  state = {
    factions: [],
    active: false,
    corporation: [],
    ceo: [],
  };

  componentDidMount() {
    this.eveService.getAllFactions().then((data) => {
      this.setState({ factions: data });
    });
  }

  allFactionsLoaded(data) {
    this.setState({
      factions: [data],
    });
  }

  showModal = (value)=> {
 

    if (value.modal_active) {
      this.eveService.getCeo(value.ceo_id).then((data) => {
        this.setState({
          active: true,
          corporation: value.corporation,
          ceo: data,
        });
      });
    } else {
      this.setState({ active: false });
    }
  };

  render() {
    const { active, corporation, ceo } = this.state;
    return (
      <div>
      <Header />
      <div className="App">
   
        {active && (
          <Modal
            corporation={corporation}
            ceo={ceo}
            showModal={this.showModal}
            active={active}
          />
        )}

        {this.state.factions.map((item) => {
          return (
            <BlockName
              showModal={this.showModal}
              key={item.corp_id}
              corp_id={item.corp_id}
              name={item.name}
              description={item.description}
              id={item.system_id}
            />
          );
        })}
      </div>
      </div>
    );
  }
}

export default App;
