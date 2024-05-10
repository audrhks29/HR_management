/** @jsxImportSource @emotion/react */

import { memo, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// import Main from "../components/introduce/Main";
import { InnerStyle } from "../styles/Common";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Introduce = memo(() => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div css={InnerStyle}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "grid",
          gridTemplateColumns: "200px 2fr",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="인사" {...a11yProps(0)} />
          <Tab label="급여" {...a11yProps(1)} />
          <Tab label="근태" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {/* <Main /> */}d
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          Item Four
        </TabPanel> */}
      </Box>
    </div>
  );
});

export default Introduce;
