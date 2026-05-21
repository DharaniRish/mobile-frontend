import{Navigate,Outlet}from"react-router-dom";export default()=>JSON.parse(localStorage.getItem("user")||"null")?.role==="admin"?<Outlet/>:<Navigate to="/" replace/>;
