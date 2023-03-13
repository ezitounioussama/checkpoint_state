import React, { Component } from "react";
import "./App.css";

//? defining class App that extends from Component class
export default class App extends Component {
  //? Defining a Constructor of class App
  constructor(props) {
    super(props);
    //! initializing a state with an object person
    this.state = {
      person: {
        fullName: "Oussama Ezitouni",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imgSrc: require("./photo_2023-03-02_23-14-15.jpg"),
        profession: "Web Developer",
      },
      /**
       *? defining two properties show (Boolean)
       *? && timeInterval (number) that mean here
       *? the time since the component was mounted
       **/
      shows: true,
      timeInterval: 0,
    };
  }

  //! This variable here hold the ID of the interval
  intervalId = null;

  //? This method here will be called after the component is mount
  componentDidMount() {
    //? this will start count when the component is mounted
    this.startInterval();
  }

  //? This method here will be called before the component is mount
  componentWillUnmount() {
    //? I just Clear the interval here and I pass as parametre the ID variable
    clearInterval(this.intervalId);
  }

  //? I just create a method to start the interval
  startInterval = () => {
    this.intervalId = setInterval(() => {
      //? here we update the state by adding 1 every second
      this.setState((prevState) => ({
        timeInterval: prevState.timeInterval + 1,
      }));
    }, 1000);
  };

  /**
   *! Here I create a method toggleShow that toggles the show property and stops the interval
   *! and the id interval will update everytime I clear the interval
   *! so when I toggle it again it start from the last second it stops not from 0
   **/
  toggleShow = () => {
    this.setState((prevState) => ({ shows: !prevState.shows }));
    clearInterval(this.intervalId);
    if (!this.state.shows) {
      this.startInterval();
    }
  };

  //? in this method render I add the time interval
  //? && I do a condition the show the card component just if the shows propertie is true
  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { shows, timeInterval } = this.state;

    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <p>Time interval since mount: {timeInterval} seconds</p>
        {shows && (
          <div className="rounded-xl border-2 border-gray-100 bg-white">
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
              <div className="block shrink-0">
                <img
                  src={imgSrc}
                  alt={fullName}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium sm:text-lg">
                  <span className="hover:underline">{fullName}</span>
                </h3>

                <p className="line-clamp-2 text-sm text-gray-700">{bio}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <strong className="-mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>

                <span className="text-[10px] font-medium sm:text-xs">
                  {profession}
                </span>
              </strong>
            </div>
          </div>
        )}
        <button
          className="group relative inline-block focus:outline-none focus:ring my-5 rounded-md"
          onClick={this.toggleShow}
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 rounded-md transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm rounded-md font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            Toggle Show
          </span>
        </button>
      </div>
    );
  }
}
