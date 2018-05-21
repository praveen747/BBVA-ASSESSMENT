import React, { Component } from 'react'
import {
    Modal,
    Button,
    Label,
    FormControl
} from 'react-bootstrap';
import {
    addEvent,
    deleteEvent
} from '../actions/actions';
import {
    connect
} from 'react-redux';
import {
    bindActionCreators
} from 'redux';

class Events extends Component {
    constructor(){
        super();
        this.state={
            editEventModal:false,
            detailEventModal:false,
            eventText:"",
            eventTime:"",
            selectedEvent:{},
            events:[]
        }
    }
    componentDidMount(){
        this.setState({
            events: this.props.events.filter(event=>event.id.startsWith(`${this.props.day}${this.props.dispMonth}${this.props.dispYear}`))
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            events: nextProps.events.filter(event=>event.id.startsWith(`${nextProps.day}${nextProps.dispMonth}${nextProps.dispYear}`))
        })
    }

    render() {
        const {selectedEvent} = this.state;
        return(
            <div className="events">
                <div className="event-header">
                    <h3 className="time">Events on {this.props.day}/{this.props.dispMonth}/{this.props.dispYear}</h3>
                    {/* <h5 className="time">11:30 AM to 12:30 PM</h5> */}
                </div>
                <Modal show={this.state.editEventModal}>
                    <Modal.Header>
                        <Modal.Title>Edit Event on {this.state.day}/{this.state.dispMonth}/{this.state.dispYear} at {selectedEvent.at}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Label>Name</Label>
                        <FormControl type='text' 
                        onChange={(e)=>{this.setState({eventText:e.target.value})}} 
                        value={this.state.eventText}
                        placeholder="Work"
                        />
                        <Label>Time</Label>
                        <FormControl type='text' 
                        onChange={(e)=>{this.setState({eventTime:e.target.value})}} 
                        value={this.state.eventTime}
                        placeholder="08:00"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={()=>{this.setState({editEventModal:false})}}>Close</Button>
                    <Button onClick={()=>{this.props.deleteEvent(
                            selectedEvent.id
                         );
                        this.props.addEvent({
                            id:selectedEvent.id,
                            text: this.state.eventText,
                            at: this.state.eventTime
                        });
                        this.setState({editEventModal:false});
                    }} bsStyle="primary">Edit Event</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.detailEventModal}>
                    <Modal.Header>
                        <Modal.Title>Event on {this.props.day}/{this.props.dispMonth}/{this.props.dispYear} at {selectedEvent.at}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{selectedEvent.text+" "} at {selectedEvent.at}</div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={()=>{this.setState({detailEventModal:false})}}>Close</Button>
                    <Button onClick={()=>{
                        this.setState({detailEventModal:false,editEventModal:true});
                    }} bsStyle="primary">Edit Event</Button>
                    <Button onClick={()=>{this.props.deleteEvent(
                            selectedEvent.id,
                        );
                        this.setState({detailEventModal:false});
                    }} bsStyle="primary">Delete Event</Button>
                    </Modal.Footer>
                </Modal>
                <div className="event-content">
                    <ul>
                        {this.state.events && this.state.events.length ? 
                            this.state.events.map(event=>{
                                return <li onClick={()=>
                                    this.setState({selectedEvent:event, eventText:event.text,eventTime:event.at, detailEventModal:true})
                                }>{event.text}{event.at && ` at ${event.at}`}</li>
                            }):
                            <p>No Events for this Day</p>
                        }
                    </ul>
                </div> <br/>
               
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        events: state.eventReducer.events,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addEvent: bindActionCreators(addEvent, dispatch),
        deleteEvent: bindActionCreators(deleteEvent, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Events);