import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CalculateIcon from "@mui/icons-material/Calculate";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import UndoIcon from "@mui/icons-material/Undo";
import { AppBar, Box, Container, IconButton, Tabs, Tab, Toolbar, Typography } from "@mui/material";
import InfoAlert from "components/InfoAlert";
import RecipesBookModal from "components/RecipesBookModal";
import SourdoughBuilderModal from "components/SourdoughBuilderModal";
import { useEditToggle } from "hooks/useEditToggle";
import { useRecipesBook } from "hooks/useRecipesBook";
import FinalDoughView from "pages/FinalDoughView";
import IngredientsView from "pages/IngredientsView";
import PrefermentsView from "pages/PrefermentsView";
import { useState, useCallback, SyntheticEvent } from "react";

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Main() {
  const recipesBookCtx = useRecipesBook();

  const [showInfo, setShowInfo] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [showSourdoughBuilder, setShowSourdoughBuilder] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const editToggle = useEditToggle();

  const onInfo = useCallback(() => setShowInfo(true), [setShowInfo]);
  const onRecipes = useCallback(() => setShowRecipes(true), [setShowRecipes]);
  const onSourdoughBulder = useCallback(() => setShowSourdoughBuilder(true), [setShowSourdoughBuilder]);

  const hideInfo = useCallback(() => setShowInfo(false), [setShowInfo]);
  const hideRecipes = useCallback(() => setShowRecipes(false), [setShowRecipes]);
  const hideSourdoughBuilder = useCallback(() => setShowSourdoughBuilder(false), [setShowSourdoughBuilder]);

  const [title, setTitle] = useState<string | undefined>(undefined);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={onInfo}>
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton color="inherit" onClick={onRecipes}>
            <MenuBookOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            {title}
          </Typography>
          <IconButton color="inherit" onClick={onSourdoughBulder}>
            <AllInclusiveIcon />
          </IconButton>
          <IconButton color="inherit" onClick={editToggle.onToggle} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ flexGrow: 1, overflow: "auto", py: 2 }}>
        <TabPanel value={selectedTab} index={0}>
          <IngredientsView editable={editToggle.editable} recipesBookCtx={recipesBookCtx} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <PrefermentsView editable={editToggle.editable} recipesBookCtx={recipesBookCtx} />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <FinalDoughView recipesBookCtx={recipesBookCtx} />
        </TabPanel>
        <InfoAlert isOpen={showInfo} onDidDismiss={hideInfo} />
        <RecipesBookModal
          isOpen={title === undefined || showRecipes}
          onSelect={setTitle}
          onClose={title === undefined ? undefined : hideRecipes}
          recipesBookCtx={recipesBookCtx}
        />
        <SourdoughBuilderModal isOpen={showSourdoughBuilder} onClose={hideSourdoughBuilder} />
      </Container>
      <AppBar position="static" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab icon={<RestaurantIcon />} label="INGREDIENTS" />
            <Tab icon={<UndoIcon />} label="PREFERMENTS" />
            <Tab icon={<CalculateIcon />} label="FINAL DOUGH" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
