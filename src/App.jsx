import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { ToastContainer } from "react-toastify";
import { routeList } from "./routes";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect } from "react";
import { doFetchUserProfile } from "./actions";
import { getDescryptionString } from "./services";
import { useDispatch } from "react-redux";
import { MVLoader } from "./components";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("_token");
    const fetchUserDetail = async () => {
      if (token) {
        const userProfileResponse = await doFetchUserProfile();
        if (userProfileResponse?.status === 200) {
          const loginToken = JSON.parse(getDescryptionString(userProfileResponse?.data?.data));
          console.log({ loginToken });
          dispatch({
            type: "STORE_AUTH_USER",
            payload: loginToken?.profile,
          });
        }
      }
    };
    fetchUserDetail();
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          hashed: false,
          token: {
            fontFamily: "Euclid Circular A, sans-serif",
          },
        }}
      >
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="App">
          <Suspense
            fallback={
              <div className="loader-backdrop">
                <MVLoader />
                {/* ....Loading */}
              </div>
            }
          >
            <Router>
              <Routes>
                {routeList?.map((routeItem, routeIndex) => {
                  //console.log({ routeItem });
                  return (
                    <Route
                      key={`routeIndex-${routeIndex}`}
                      path={routeItem.path}
                      element={
                        <ProtectedRoute
                          key={`route-${routeIndex}-${routeItem?.id}`}
                          path={routeItem?.path}
                          name={routeItem?.name}
                          component={routeItem?.component}
                          isAuth={routeItem?.isAuth}
                          accessRoles={routeItem?.accessRoles}
                        >
                          {routeItem?.component}
                        </ProtectedRoute>
                      }
                    />
                  );
                })}
              </Routes>
            </Router>
          </Suspense>
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;
