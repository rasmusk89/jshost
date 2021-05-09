import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMealType } from "../../dto/IMealType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";

const MealTypeDetails = () => {
    // Get the router params from hook
    let { id } = useParams() as IRouteId;

    const [mealType, setMealType] = useState({} as IMealType);
    const [pageStatus, setPageSatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

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

    return (
        <>
            <h1>
                Meal Type details.
            </h1>
            <hr />

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
            </div>
            <hr />
            <NavLink to="/MealTypes" className="col-2 btn btn-primary">Back to list</NavLink>

        </>
    );
}

export default MealTypeDetails;
