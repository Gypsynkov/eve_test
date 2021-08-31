import React, { Component } from "react";
import "./modal.css";
import EVEService from "./services/eveservices";

class Modal extends Component {
  eveservice = new EVEService()
  state = {
    activeModal: this.props.active,
    activeCeo: false
  };
  componentDidMount() {
    console.log("Props from app", this.props.active);
    if (this.props.active) {
      console.log("Can render");
    }
  }
  closeModal = () => {
    this.setState({ activeModal: false });
    this.props.showModal(false);
  };

  showCeoInfo=()=>{
    // this.eveservice.getRace(this.props.ceo.race_id).then((data)=>console.log(data))
this.setState({activeCeo:true})
  }
  render() {
    const { name, member_count, description } = this.props.corporation;
    return (
      <div
        onClick={this.closeModal}
        className={this.props.active ? "modal active" : "modal"}
      >
        <div onClick={(e)=>e.stopPropagation()}
          className={
            this.props.active ? "modal__content active" : "modal__active"
          }
        >
          <div onClick={this.closeModal} className="headerContent">
            Close
          </div>
          <div className="modal__main">
            <div className="modal__content__corporation">
              <div>Имя: {name} </div>
              <div onClick={this.showCeoInfo}>CEO: {this.props.ceo.name} </div>
              <div>Число участников: {member_count} </div>
              <div>Описание: {description} </div>
            </div>

           {this.state.activeCeo && <div className="modal__content__ceo">
              <div>Имя CEO: {this.props.ceo.name} </div>
              <div>Birthday: {this.props.ceo.birthday} </div>
              <div>Race: {this.props.ceo.race_id} </div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
