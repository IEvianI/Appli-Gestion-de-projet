import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { 
    TASK_STATUS_CLASS_MAP, 
    TASK_STATUS_TEXT_MAP 
} from "@/constants.jsx";
import { Link, router } from '@inertiajs/react';

export default function TasksTable({ tasks, success, queryParams = null, hideProjectColumn = false }) {

    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams)
    }

    const deleteTask = (task) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer la tâche ?")) {
          return;
        }
        router.delete(route("task.destroy", task.id));
      };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('task.index'), queryParams);
    }

    return (
        <>
        {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
        <div className="overflow-auto">
                <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                                ID
                                </TableHeading>
                            <th className="px-3 py-3">Image</th>
                            {!hideProjectColumn && (<th className="px-3 py-3">Nom du projet</th>)}
                                <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                                Nom
                                </TableHeading>

                                <TableHeading
                            name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                                Statut
                                </TableHeading>
                                <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                                Date de création
                                </TableHeading>
                                <TableHeading
                            name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                                Échéance
                                </TableHeading>
                            <th className="px-3 py-3">Créé par</th>
                            <th className="px-3 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            {!hideProjectColumn && (<th className="px-3 py-3"></th>)}
                            <th className="px-3 py-3">
                                <TextInput 
                                className="w-full"
                                defaultValue={queryParams.name}
                                placeholder="Nom de la tâche"
                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                onKeyPress={e => onKeyPress('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput className="w-full"
                                defaultValue={queryParams.status}
                                 onChange={e => 
                                    searchFieldChanged('status', e.target.value)} >
                                        <option value="">Statut</option>
                                        <option value="en_attente">En attente</option>
                                        <option value="en_cours">En cours</option>
                                        <option value="terminé">Terminé</option>
                                    </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(task => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={task.id}
                            >
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2">
                                <img src={task.image_path} alt="" style={{width: 60}} />
                            </td>
                            {!hideProjectColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
                            <th className="px-3 py-2 text-gray-100 hover:underline">
                            <Link href={route("task.show", task.id)}>
                            {task.name}
                            </Link>
                            </th>
                            <td className="px-3 py-2">
                                <span className={
                                    "px-2 py-1 rounded text-nowrap text-white " +
                                    TASK_STATUS_CLASS_MAP[task.status] 
                                }>
                                {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                                </td>
                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                            <td className="px-3 py-2">{task.created_by.name}</td>
                            <td className="px-3 py-2 text-nowrap">
                                <Link href={route('task.edit', task.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                Modifier 
                                </Link>
                                <button
                                onClick={(e) => deleteTask(task)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                Supprimer 
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <Pagination links={tasks.meta.links} />
        </>
    )
}