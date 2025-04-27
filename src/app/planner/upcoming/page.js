"use client";

//Components
import TaskItem from "@/components/TaskItem";
import DataNotFound from "@/components/DataNotFound";
import CreateItemComponent from "@/components/CreateItemComponent";

const page = () => {
  const mock = [
    {
      title: "Tarea 1",
      description: "Descripcion de la tarea 1",
      date: "2023-10-01",
      list: {
        color: "yellow",
        name: "Lista de estudio IUE",
      },
      tag: {
        color: "red",
        name: "Noveno semestre",
      },
      file: {
        name: "Trabajo de grados version2",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 1",
      description: "Descripcion de la tarea 1",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Trabajo de grados version2",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 2",
      description: "Descripcion de la tarea 2",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
  ];
  const mock2 = [
    {
      title: "Tarea 1",
      description: "Descripcion de la tarea 1",
      date: "2023-10-01",
      list: {
        color: "yellow",
        name: "Lista de estudio IUE",
      },
      tag: {
        color: "red",
        name: "Noveno semestre",
      },
      file: {
        name: "Trabajo de grados version2",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 2",
      description: "Descripcion de la tarea 2",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
  ];
  const mock3 = [
    {
      title: "Tarea 1",
      description: "Descripcion de la tarea 1",
      date: "2023-10-01",
      list: {
        color: "yellow",
        name: "Lista de estudio IUE",
      },
      tag: {
        color: "red",
        name: "Noveno semestre",
      },
      file: {
        name: "Trabajo de grados version2",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 2",
      description: "Descripcion de la tarea 2",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
    {
      title: "Tarea 3",
      description: "Descripcion de la tarea 3",
      date: "2023-10-01",
      list: {
        color: "red",
        name: "Tarea 1",
      },
      tag: {
        color: "red",
        name: "Tarea 1",
      },
      file: {
        name: "Tarea 1",
        url: "https://www.google.com",
      },
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full flex items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-neutral">
          Upcoming
        </h1>
        <div className="border border-sideBar rounded-lg h-10 md:h-12 flex items-center justify-center ml-2 md:ml-4 md:px-4 px-2 text-xl font-bold">
          12
        </div>
      </div>
      <div className="border border-sideBar rounded-lg p-3 h-full">
        <p className="text-md md:text-xl font-bold text-neutral pb-4">Hoy</p>
        <CreateItemComponent onClick={() => console.log("click")}>
          Agregar nueva tarea
        </CreateItemComponent>
        <div>
          {mock.length === 0 && (
            <DataNotFound paddingY={"pt-6"} text="No hay tareas para hoy" />
          )}
          {mock.length > 0 && (
            <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
              {mock.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  onClick={() => console.log("click")}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex xl:flex-row flex-col md:gap-x-4 gap-y-4 mt-4 items-start">
        <div className="border border-sideBar rounded-lg p-3 xl:w-1/2 w-full">
          <p className="text-md md:text-xl font-bold text-neutral pb-4">
            Mañana
          </p>
          <CreateItemComponent onClick={() => console.log("click")}>
            Agregar nueva tarea
          </CreateItemComponent>
          <div>
            {mock2.length === 0 && (
              <DataNotFound
                paddingY={"pt-6"}
                text="No hay tareas para mañana"
              />
            )}
            {mock2.length > 0 && (
              <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                {mock2.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    onClick={() => console.log("click")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" border border-sideBar rounded-lg p-3 xl:w-1/2 w-full">
          <p className="text-md md:text-xl font-bold text-neutral pb-4">
            Esta semana
          </p>
          <CreateItemComponent onClick={() => console.log("click")}>
            Agregar nueva tarea
          </CreateItemComponent>
          <div>
            {mock3.length === 0 && (
              <DataNotFound
                paddingY={"pt-6"}
                text="No hay tareas para esta semana"
              />
            )}
            {mock3.length > 0 && (
              <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                {mock3.map((task, index) => (
                  <TaskItem
                    key={index}
                    task={task}
                    onClick={() => console.log("click")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
