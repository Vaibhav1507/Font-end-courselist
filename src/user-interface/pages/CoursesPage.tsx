import React from "react";
// import { URLSearchParams } from "url";
import { CourseSearchResult } from "../../web-service/models/CourseSearchResultList";
import CourseCard from "../components/CourseCard";
import "./CoursesPage.scss";

interface CoursesPageProperties {
}

interface CoursesPageState {
	courseList: CourseSearchResult[],
	courseFirstIndex: number,
	courseLastIndex: number,
	currentPageNumber: number,
	numberOfItemsPerPage: number,
	searchTerm: string,
	sortOrder: number
}

class CoursesPage extends React.Component<CoursesPageProperties, CoursesPageState> {
	constructor(props = {}){
		super(props);
		this.state = {
			courseList: [],
			courseFirstIndex: 0,
			courseLastIndex: 0,
			currentPageNumber: 1,
			numberOfItemsPerPage: 20,
			searchTerm: "",
			sortOrder: 1
		}
	}

	componentDidMount(){
		fetch("https://lx.festo.com/SearchService/api/search/learning-paths/public")
		.then(res => res.json())
		.then(response => {
			this.setState({
				courseList: response.publicLearningPathResults
			})
		})
		.catch(error => {
			console.log(error)
		})
		this.setUrlSearchParameters();
	}

	getFilteredCourseList() {
		//search text filter
		this.state.courseList.filter((course) => {
			if(this.state.searchTerm == ""){
				return course;
			}
			else if(course.name.toLowerCase().includes(this.state.searchTerm)){
				return course;
			}
		})

		//pagination
		this.setState({
			courseLastIndex: this.state.currentPageNumber * this.state.numberOfItemsPerPage,
			courseFirstIndex: this.state.courseLastIndex - this.state.numberOfItemsPerPage
		})

		const filteredCourseList = this.state.courseList.slice(this.state.courseFirstIndex, this.state.courseLastIndex);

		//sorting
		switch (this.state.sortOrder) {
			//MostRelevant = 1
			case 1:
				
				break;
			//Popularity = 2
			case 2:

				break;
			
			//MostRecent = 3
			case 3:
				
				break;
			//Oldest = 4
			case 4:
				
				break;
			default:
				break;
		}

		return filteredCourseList;
	}

	setUrlSearchParameters() {
		// const params = new URLSearchParams(this.props.location.search);
		let searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('term')) {
			this.setState({
				searchTerm: (String)(searchParams.get('term'))
			})
		} else {
			searchParams.set("term", this.state.searchTerm);
		}

		if (searchParams.get('page')) {
			this.setState({
				currentPageNumber: (Number)(searchParams.get('page'))
			})
		} else {
			searchParams.set("page", this.state.currentPageNumber.toString());
		}

		if (searchParams.get('size')) {
			this.setState({
				numberOfItemsPerPage: (Number)(searchParams.get('size'))
			})
		} else {
			searchParams.set("size", this.state.numberOfItemsPerPage.toString());
		}

		if (searchParams.get('sortOrder')) {
			this.setState({
				numberOfItemsPerPage: (Number)(searchParams.get('sortOrder'))
			})
		} else {
			searchParams.set("sortOrder", this.state.sortOrder.toString());
		}

		let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
		window.history.pushState({ path: newurl }, '', newurl);
	}
	

	public render(): JSX.Element {
		if(this.state.courseList.length === 0){
			return <></>;
		}
		return (
			<div className="courses-page container">
				<div className="row">
					<div className="row">
						{this.state.courseList.map((item) => { 
							return <CourseCard key={item.id} course={item}/>
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default CoursesPage;
