import React from "react";
import "./CourseCard.scss";
import {Modal} from 'react-bootstrap';
import { CourseSearchResult } from "../../web-service/models/CourseSearchResultList";

interface CourseCardProperties {
	course: CourseSearchResult;
}

interface CourseCardState {
	showDescriptionModal: boolean;
}

class CourseCard extends React.Component<CourseCardProperties, CourseCardState> {
	
	constructor(props: CourseCardProperties){
		super(props);
		this.state = {
			showDescriptionModal: false
		};
	}

	

	public render(): JSX.Element {
		const {course} = this.props
		console.log(course.id);
		

		const toggleDisplayModal = () => {
			this.setState( prevState => {
				return{
					...prevState,
					showDescriptionModal: !prevState.showDescriptionModal
				}
			});
		}

		return (
			<>
			<div className="card" >
				<div className="card-header">
					<img className="card-img-top card-image" src={course.images ? course.images.thumbnail : `/images/noimage.png`}/>
				</div>
				<div className="card-body">
					<div className="template-card-body">
						<h5 className="card-title">{course.name}</h5>
						<p className="card-text text-secondary">{course.name}</p>
					</div>
					<div>
						<a href="#" className="btn btn-link btn-right" onClick={() => toggleDisplayModal()}>Show More</a>
					</div>
				</div>
			</div>
			<Modal show={this.state.showDescriptionModal} centered>
				<Modal.Header>
					<b>{course.name}</b>
				</Modal.Header>
				<Modal.Body>
					<b>Descrption:</b><br />
					{course.description}
				</Modal.Body>
				<Modal.Footer>
					<a href="#" className="btn btn-link btn-right" onClick={() => toggleDisplayModal()}>Close</a>
				</Modal.Footer>
			</Modal>
			</>
		);
	}
}

export default CourseCard;
