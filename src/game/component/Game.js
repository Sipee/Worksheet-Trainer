import React from 'react'

const Game = ({worksheet, fn}) => (
    <div className="box">
        <div className="box-title">
            <h2>{worksheet.name} ({worksheet.id})</h2>
            <a href={"/editor/" + worksheet.id} className="btn btn-primary">Edit</a>
            
            <hr />
            
            <div className="mode-selection">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <button 
                        className={"btn btn-" + fn.getModeClass('easy') + " margin-btm-5"} 
                        data-mode="easy" 
                        onClick={fn.changeMode}>Easy</button>
                    </div>

                    <div className="col-md-4 col-sm-12">
                        <button 
                        className={"btn btn-" + fn.getModeClass('normal') + " margin-btm-5"} 
                        data-mode="normal" 
                        onClick={fn.changeMode}>Normal</button>
                    </div>

                    <div className="col-md-4 col-sm-12">
                        <button 
                        className={"btn btn-" + fn.getModeClass('hard') + " margin-btm-5"} 
                        data-mode="hard" 
                        onClick={fn.changeMode}>Hard</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="box-body">
            {fn.getMode()}
        </div>

        <div className="box-footer">
        </div>
    </div>
)

export default Game
