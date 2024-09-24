import About from "../pages/about/About";
import Calendar from "../pages/calendar/calendar";
import EditorMain from "../pages/editor/EditorMain";
import Pomodoro from "../pages/pomodoro/Pomodoro";


import {
    AppsOutlined,
    DashboardOutlined,
    ArticleOutlined,
    FormatListBulletedOutlined,
} from "@mui/icons-material";

const appRoutes = [
    {
        path: "/about",
        element: <About />,
        state: "Home",
        sidebarProps: {
        displayText: "Home",
        icon: <DashboardOutlined />,
        },
    },
    {
        path: "/calendar",
        element: <Calendar />,
        state: "calendar",
        sidebarProps: {
        displayText: "Calendario",
        icon: <AppsOutlined />,
        },
    },
    {
        path: "/editormain",
        element: <EditorMain />,
        state: "editorMain",
        sidebarProps: {
        displayText: "Note",
        icon: <ArticleOutlined />,
        },
    },
    {
        path: "/pomodoro",
        element: <Pomodoro />,
        state: "pomodoro",
        sidebarProps: {
        displayText: "Pomodoro",
        icon: <FormatListBulletedOutlined />,
        },
    },
];

export default appRoutes;