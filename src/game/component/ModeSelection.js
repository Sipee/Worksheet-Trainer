import React from 'react'

const ModeSelection = (props) => (
    <div className="mode-selection">
        <div className="row">
            <div className="col-sm-4">
                <div className="mode">
                    <button 
                        onClick={props.updateMode} 
                        data-mode="0" 
                        className={"btn btn-outline-success " + (props.mode === 0 ? "fill" : "")}>
                        <i className="fa fa-thermometer-empty" aria-hidden="true"></i> Easy
                    </button>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="mode">
                    <button 
                        onClick={props.updateMode} 
                        data-mode="1" 
                        className={"btn btn-outline-warning " + (props.mode === 1 ? "fill" : "")}
                    >
                        <i className="fa fa-thermometer-half" aria-hidden="true"></i> Medium
                    </button>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="mode">
                    <button 
                        onClick={props.updateMode}
                        data-mode="2" 
                        className={"btn btn-outline-danger " + (props.mode === 2 ? "fill" : "")}
                    >
                        <i className="fa fa-thermometer-full" aria-hidden="true"></i> Hard
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default ModeSelection