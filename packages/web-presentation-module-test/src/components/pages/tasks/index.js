import permissions from "../../../permissions";
import {TASKS_LIST_PAGE_KEY} from "../page-keys";

import TasksList from './TasksList';

export const TasksListPage = {
    key: TASKS_LIST_PAGE_KEY,
    path: '/tasks',
    component: TasksList,
    availability: permissions.TASKS_LIST,
};