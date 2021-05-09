import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMealType } from "../../dto/IMealType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { EResponseStatus } from "../../types/EResponseStatus";
import { IRouteId } from "../../types/IRouteId";

const MealTypeDelete = () => {

    let { id } = useParams() as IRouteId;

    const [mealType, setMealType] = useState({} as IMealType);
    const [pageStatus, setPageSatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [responseStatus, setResponseStatus] = useState({ responseStatus: EResponseStatus.Unfinished })

    const loadData = async () => {
        let result = await BaseService.GetOne<IMealType>('/mealtypes', id);
        if (result.ok && result.data) {
            setPageSatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setMealType(result.data);
        } else {
            setPageSatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode })
        }
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteData = async (e: Event) => {
        e.preventDefault();
        let result = await BaseService.Delete('/mealtypes', id);
        if (result.statusCode === 204) {
            setResponseStatus({ responseStatus: EResponseStatus.OK })
        } else {
            setResponseStatus({ responseStatus: EResponseStatus.Error })
        }
    }

    return (
        <>
            { responseStatus.responseStatus === EResponseStatus.OK ? <Redirect to="/MealTypes" /> : null}

            <h1>Delete</h1>

            <h3>Are you sure you want to delete this?</h3>
            <div>
                <h4>Meal Type</h4>
                <hr />
                <Loader {...pageStatus} />

                <dl className="row">
                    <dt className="col-sm-2">
                        Id
                    </dt>
                    <dd className="col-sm-10">
                        {mealType.id}
                    </dd>
                    <dt className="col-sm-2">
                        Meal Type
                    </dt>
                    <dd className="col-sm-10">
                        {mealType.mealTypeName}
                    </dd>
                    <dt className="col-sm-2">
                        Price
                    </dt>
                    <dd className="col-sm-10">
                        {mealType.price}
                    </dd>
                </dl>
                <div className="row">
                    <NavLink to="/MealTypes" className="col-2 btn btn-primary">Back to list</NavLink>
                    <button onClick={(e) => deleteData(e.nativeEvent)} type="submit" className="col-2 btn btn-danger" >Delete</button>
                </div>

            </div>
        </>
    );
}

export default MealTypeDelete;
