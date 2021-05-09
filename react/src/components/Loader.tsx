import { EPageStatus } from "../types/EPageStatus";

const Loader = (props: { pageStatus: EPageStatus, statusCode: number }) => {

    if (props.pageStatus === EPageStatus.Loading) {
        return <div className="alert alert-primary">Loading...</div>
    }

    if (props.pageStatus === EPageStatus.Error) {
        return <div className="alert alert-danger">Error... {props.statusCode}</div>
    }
    return <></>
}

export default Loader;
