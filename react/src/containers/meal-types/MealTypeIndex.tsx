import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMealType } from "../../dto/IMealType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { mealType: IMealType }) => (
    <tr>
        <td>
            {props.mealType.mealTypeName}
        </td>
        <td>
            {props.mealType.price}
        </td>
        <td>
            <Link to={'/MealTypes/edit/' + props.mealType.id}>Edit</Link> |
            <Link to={'/MealTypes/' + props.mealType.id}> Details</Link> |
            <Link to={'/MealTypes/delete/' + props.mealType.id}> Delete</Link>
        </td>
    </tr>
)

const MealTypeIndex = () => {
    const [mealTypes, setMealTypes] = useState([] as IMealType[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.GetAll<IMealType>('/mealtypes')
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 })
            setMealTypes(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode })
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <h1>Meal Types page</h1>
           
            <p>
                <NavLink to="/MealTypes/Create">Create new</NavLink>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Meal Type
                        </th>
                        <th>
                            Price
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {mealTypes.map(mealType =>
                        <RowDisplay mealType={mealType} key={mealType.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default MealTypeIndex;
