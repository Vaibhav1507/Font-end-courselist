import React from "react";
import "./CourseCard.scss";
import { CourseSearchResult } from "../../web-service/models/CourseSearchResultList";

interface CourseCardProperties {
	course: CourseSearchResult;
}

interface CourseCardState {
}

class CourseCard extends React.Component<CourseCardProperties, CourseCardState> {

	public render(): JSX.Element {
		const {course} = this.props
		console.log(course.images);
		
		// let imageUrl:string = this.props.course.images.overview;
		return (
			// <div className="course-card">
			// 	<a id="card" href="">
			// 		<div className="LearningCOntentCardTemplate">
			// 			<div className="template-card-header">
			// 				<div className="background background-image backgorund-image-right" ></div>
			// 			</div>
			// 			<div className="template-card-body d-flex flex-column">
			// 				<div className="d-flex flex-grow-1">
			// 					<div className="d-flex flex-grow-1 flex-column min-width-0">
			// 						<div lang="en" className="regular-responsive-text font-weight-bold mb-1">
			// 							<div id="a1fcf3e3-87c3-40da-9dd7-045003845bbd" className="TextTruncate" >
			// 								<div className="text-truncate-line">
			// 									{this.props.course.name}
			// 								</div>
			// 							</div>
			// 						</div>
			// 						<div className="smaller-responsive-text">
			// 							<div id="011f4e08-cb5c-46f0-92ef-2d215728c642" className="TextTruncate" >
			// 								<div className="text-truncate-line">eLab course by Festo Didactic</div>
			// 							</div>
			// 						</div>
			// 					</div>
			// 				</div>
			// 				<div className="d-flex">
			// 					<div className="d-flex flex-grow-1 align-items-center"></div>
			// 					<div className="card-link regular-responsive-text d-flex align-items-center">Show More</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</a>
			// 	{/* {`Card of ${this.props.course.name}`} */}
			// </div>

			<div className="card course-card">
				<div className="card-header">
					<img className="card-img-top" src="img_avatar1.png" alt="Card image" style={{width:"100%"}}></img>
				</div>
				<div className="card-body d-flex flex-column">
					<div className="display-flex flex-grow-1 flex-column">
						<h4 className="card-title">{course.name}</h4>
						<p className="card-text card-sub-title">{course.name}</p>
					</div>
					<div className="display-flex">
						<div className="display-flex flex-grow-1 align-items-center"></div>
						<a href="#" className="btn btn-link ">Show More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default CourseCard;
