import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Login from "../../components/login";
import Register from "../../components/register";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="w-[600px] mx-auto mt-40 border p-4 rounded-lg">
      <Tabs variant="soft-rounded" colorScheme="facebook">
        <TabList>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"}>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default Auth;
