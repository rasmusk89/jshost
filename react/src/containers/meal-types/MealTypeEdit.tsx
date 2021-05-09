import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { IMealType } from "../../dto/IMealType";
import { BaseService } from "../../services/base-service";
import { EResponseStatus } from "../../types/EResponseStatus";
import { IRouteId } from "../../types/IRouteId";

const MealTypeEdit = () => {
    let { id } = useParams() as IRouteId;

    const [mealType, setMealType] = useState({mealTypeName: '', price: 0} as IMealType);
    const [responseStatus, setResponseStatus] = useState({ responseStatus: EResponseStatus.Unfinished })


    const editClicked = async (e: Event) => {
        e.preventDefault();
        let response = await BaseService.Put('/MealTypes', id, mealType);
        if (!response.ok) {
            setResponseStatus({ responseStatus: EResponseStatus.Error })
        } else {
            setResponseStatus({ responseStatus: EResponseStatus.OK })
        }
    }

    const loadData = async () => {
        let result = await BaseService.GetOne<IMealType>('/mealtypes', id);
        if (result.ok && result.data) {
            setMealType(result.data);
        } else {
            console.log("Error")
        }
    }

    useEffect(() => {
        loadData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            { responseStatus.responseStatus === EResponseStatus.OK ? <Redirect to="/MealTypes" /> : null}

            <h1>Edit</h1>

            <h4>Meal Type</h4>
            <hr />
            <form onSubmit={(e) => editClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <div className="form-group">
                                <label htmlFor="Input_Name">Meal Type name</label>
                                <input value={mealType.mealTypeName} onChange={e => setMealType({ ...mealType, mealTypeName: e.target.value })} className="form-control" type="text" id="Input_Name" name="Input.Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Price">Price</label>
                                <input value={mealType.price} onChange={e => setMealType({ ...mealType, price: parseFloat(e.target.value) })} className="form-control" type="number" step="0.1" id="Input_Price" name="Input.Price" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="col-4 btn btn-primary">Edit</button>
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

export default MealTypeEdit;
