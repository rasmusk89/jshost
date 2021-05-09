import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { IMealType } from "../../dto/IMealType";
import { BaseService } from "../../services/base-service";
import { EResponseStatus } from "../../types/EResponseStatus";

const MealTypeCreate = () => {

    const [mealType, setMealType] = useState({mealTypeName: '', price: 0} as IMealType);
    const [responseStatus, setResponseStatus] = useState({ responseStatus: EResponseStatus.Unfinished })

    const createClicked = async (e: Event) => {
        e.preventDefault();
        let response = await BaseService.Create('/MealTypes', mealType);
        if (!response.ok) {
            setResponseStatus({ responseStatus: EResponseStatus.Error })
        } else {
            setResponseStatus({ responseStatus: EResponseStatus.OK })
        }
    }

    return (

        <>
            { responseStatus.responseStatus === EResponseStatus.OK ? <Redirect to="/MealTypes" /> : null}

            <h1>Create</h1>

            <h4>Meal Type</h4>
            <hr />
            <form onSubmit={(e) => createClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <div className="form-group">
                                <label htmlFor="Input_Name">Meal Type name</label>
                                <input value={mealType.mealTypeName} onChange={e => setMealType({ ...mealType, mealTypeName: e.target.value })} className="form-control" type="text" id="Input_Name" name="Input.Name" placeholder="Meal type name.." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Price">Price</label>
                                <input value={mealType.price} onChange={e => setMealType({ ...mealType, price: parseFloat(e.target.value) })} className="form-control" type="number" step="0.1" id="Input_Price" name="Input.Price" placeholder="Price.." />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => createClicked(e.nativeEvent)} type="submit" className="col-4 btn btn-primary">Create</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="col-md-4">
                    <NavLink to="/MealTypes" className="col-4 btn btn-primary">Back to list</NavLink>
                </div>
            </div>

        </>
    );
}

export default MealTypeCreate;
