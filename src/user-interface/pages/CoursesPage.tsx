import React from "react";
// import { URLSearchParams } from "url";
import { CourseSearchResult } from "../../web-service/models/CourseSearchResultList";
import CourseCard from "../components/CourseCard";
import "./CoursesPage.scss";

interface CoursesPageProperties {
}

interface CoursesPageState {
	courseList: CourseSearchResult[],
	filteredCourseList: CourseSearchResult[],
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
			sortOrder: 1,
			filteredCourseList: []
		}
	}

	componentDidMount(){
		fetch("https://lx.festo.com/SearchService/api/search/learning-paths/public")
		.then(res => res.json())
		.then(response => {
			this.setState({
				courseList: response.publicLearningPathResults
			})
			console.log(this.state.courseList[0]);
			
			this.setUrlSearchParameters();
		})
		.catch(error => {
			console.log(error)
		})
	}

	getFilteredCourseList() {
		//search text filter
		this.searchFilter();
		

		//pagination
		this.pagination();
		

		//sorting
		this.sorting();
	}

	searchFilter(){
		this.setState({filteredCourseList:this.state.courseList.filter((course) => {
			if(this.state.searchTerm == ""){
				return course;
			}
			else if(course.name.toLowerCase().includes(this.state.searchTerm)){
				return course;
			}
		})})
	}

	pagination() {
		this.setState({
			courseLastIndex: this.state.currentPageNumber * this.state.numberOfItemsPerPage
		})

		this.setState({
			courseFirstIndex: this.state.courseLastIndex - this.state.numberOfItemsPerPage
		})

		this.setState({filteredCourseList: this.state.filteredCourseList.slice(this.state.courseFirstIndex, this.state.courseLastIndex)});
	}

	sorting(){
		switch (this.state.sortOrder) {
			//MostRelevant = 1
			case 1:
				this.setState({
					filteredCourseList: this.state.filteredCourseList.sort((a, b) =>  b.id - a.id)
				})
				break;
			//Popularity = 2
			case 2:

				break;
			
			//MostRecent = 3
			case 3:
				this.setState({
					filteredCourseList: this.state.filteredCourseList.sort((a, b) =>  { return +new Date(b.creationDate) - +new Date(a.creationDate)})
				})
				break;
			//Oldest = 4
			case 4:
				this.setState({
					filteredCourseList: this.state.filteredCourseList.sort((a, b) => { return +new Date(a.creationDate) - +new Date(b.creationDate)})
					})
				break;
			default:
				break;
		}
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
				sortOrder: (Number)(searchParams.get('sortOrder'))
			})
		} else {
			searchParams.set("sortOrder", this.state.sortOrder.toString());
		}

		let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
		window.history.pushState({ path: newurl }, '', newurl);
		
		this.getFilteredCourseList();
	}
	

	public render(): JSX.Element {
		if(this.state.filteredCourseList.length === 0){
			return <>
				<h1 style={{textAlign:"center"}}>No course found</h1>
			</>;
		}
		return (
			<div className="courses-page">
				<div className="row">
						{this.state.filteredCourseList.map((item) => { 
							return <CourseCard key={item.id} course={item}/>
						})}
				</div>
			</div>
		);
	}
}

export default CoursesPage;
