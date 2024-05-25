/** @jsxImportSource @emotion/react */

import { memo, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Index from "../components/introduce/Index";
import { InnerStyle } from "../styles/commonStyles";

import hrList from "../assets/introduceList/hr.json";
import salaryList from "../assets/introduceList/salary.json";
import attitudeList from "../assets/introduceList/attitude.json";
import SEOMetaTag from "../SEOMetaTag";

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
      {...other}>
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

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <SEOMetaTag
        title="Introduce"
        description="HR_Management의 소개 페이지 입니다."
        keywords="HR_Management Introduce"
        url="https://hr-management-three.vercel.app/Introduce"
      />
      <div css={InnerStyle}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "grid",
            gridTemplateColumns: "200px 2fr",
          }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}>
            <Tab label="인사" {...a11yProps(0)} />
            <Tab label="급여" {...a11yProps(1)} />
            <Tab label="근태" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Index data={hrList} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Index data={salaryList} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Index data={attitudeList} />
          </TabPanel>
        </Box>
      </div>
    </>
  );
});

export default Introduce;
