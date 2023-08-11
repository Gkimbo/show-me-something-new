import React from "react";

const HomePage = (props) => {

    return(
        <div className="grid-x">
            <div className="cell small-12 medium-12 large-6">
                <div className="container">
                    <h1>Hello from user home page</h1>
                </div>
            </div>
            <div className="cell small-12 medium-12 large-6">
                <div className="container">
                    <h1>Popular destinations</h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage