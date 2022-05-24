import { Fragment} from "react";
import { Outlet } from "react-router-dom";

const Shop = () => {
    return (
        <Fragment>
            <div>Hi this is shop</div>
            <Outlet/>
        </Fragment>
    );
};

export default Shop