import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import './cardStyle.css';

export default class GhostCard extends React.Component {
  render() {
    return (
      <div>
        <Card inverse>
          <CardImg width="auto" src={this.props.data.loc_img_link} alt="Card image cap" />
          <CardImgOverlay className="cardSizing">
            <CardTitle className="CardTitle">{this.props.data.place_name}</CardTitle>
            <CardText>{this.props.data.address.city}</CardText>
            <CardText>
              <small href="#" className="text-muted">
                Click card to learn more
              </small>
            </CardText>
          </CardImgOverlay>
        </Card>
      </div>
    );
  }
}

//TODO get CardImgOverlay to fill the whole card that is being created.
