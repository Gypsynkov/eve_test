import React, { Component, useEffect } from "react";
import EVEService from "./services/eveservices";
import "./BlockName.css";

class BlockName extends Component {
  state = {
    system_name: "",
    corporation_name: "",
    style: "none",
    display: false,
    modal:{
      modal_active: true,
      corporation: [],
      ceo_id: ''
    }
    ,
  };
  eveServices = new EVEService();
  componentDidMount() {
    this.eveServices.getSolarSystem(this.props.id).then((data) => {
      this.setState({ system_name: data.name });
    });
    this.eveServices.getCorporation(this.props.corp_id).then((data) => {
      this.setState({ corporation_name: data.name,
        modal: {
          modal_active: true,
          corporation: data,
          ceo_id: data.ceo_id

        }
      
      });
    });
  }
  showDescription = (e) => {
    if (this.state.display === false) {
      this.setState({ display: true });
    } else {
      this.setState({ display: false });
    }
  };

  modalInfo=()=>{
    this.props.showModal(this.state.modal)
  }

  render() {
    const { name, description, corp_id, showModal } = this.props;
    const { system_name, modal_active, display, corporation_name } = this.state;
    return (
      <div>
      <div className="blockName">
        <div onClick={this.showDescription} className="blockName_card-header">
          Фракция: {name}
        </div>
        {display && (
          <div className="blockNameDesc">
            <div className="card-body">
              <p className="card-text">{description}</p>
              <p className="card-text">Система: {system_name}</p>
              <p onClick={this.modalInfo} className="card-text">Корпорация: {corporation_name}</p>
            </div>
          </div>
        )}
      </div>
      </div>
    );
  }
}
export default BlockName;
