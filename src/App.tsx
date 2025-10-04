import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useState, useEffect, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useUserSelection } from "../context/selectionContext.tsx";
import "./App.css"


export type User = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number;
  date_end: number;
};



export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);
  const [first, setFirst] = useState<number | undefined>(0);
  const panelRef = useRef<OverlayPanel>(null);

  const { selectedUsers, setSelectedUsers, remaining, setRemaining } = useUserSelection();


  const API = `https://api.artic.edu/api/v1/artworks?page=${currentPage ? currentPage +1 : 0}`;

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(json => {
        const filteredData = json.data.map((user: User) => ({
          id: user.id,
          title: user.title,
          place_of_origin: user.place_of_origin,
          artist_display: user.artist_display,
          inscriptions: user.inscriptions,
          date_start: user.date_start,
          date_end: user.date_end,
        }));
        setUsers(filteredData);
      })
      .catch(err => console.error(err));
  }, [currentPage]);

  useEffect(() => {
    if (remaining && remaining > 0) {
      const take = Math.min(users.length, remaining);
      const newRows = users.slice(0, take);

      setSelectedUsers(prev => {
        const ids = new Set(prev.map(u => u.id));
        const merged = [...prev, ...newRows.filter(u => !ids.has(u.id))];
        return merged;
      });

      setRemaining(prev => (prev ? prev - take : 0));
    }
  }, [users]);


  return (
    <main>
      <div className="tableContainer">
        <DataTable
          value={users}
          selection={selectedUsers}
          onSelectAllChange={(event) => {
            setSelectedUsers([])
            setRemaining(undefined)
            panelRef.current?.toggle(event)
          }}
          onSelectionChange={(e) => {
            setSelectedUsers(e.value)
          }}
          selectionMode="multiple"
          paginator
          rows={12}
          totalRecords={144}
          lazy={true}
          first={first}
          onPage={(event) => {
            setCurrentPage(event.page)
            setFirst(event.first)
          }}
        >
          
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Origin" />
          <Column field="artist_display" header="Artist" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="start Year" />
          <Column field="date_end" header="End Year" />
        </DataTable>
        <div className="overlay">
          <OverlayPanel ref={panelRef} appendTo={document.querySelector(".tableContainer")}>
            <label htmlFor="row-selector">
              <input id='row-selector' type="number" placeholder='select rows...' />
              <button onClick={() => {
                  const value = Number(panelRef.current?.getElement()?.querySelector("input")?.value)
                  if (value) {
                    if (value >= 1) {
                      const newSelected = users.slice(0, value);

                      setSelectedUsers(prev => {
                        const ids = new Set(prev.map(u => u.id));
                        const merged = [...prev, ...newSelected.filter(u => !ids.has(u.id))];
                        return merged;
                      });
                      setRemaining(value - newSelected.length);
                      panelRef.current?.hide()
                    }
                    } else {
                      panelRef.current?.hide()
                    }
                  }
                }>submit</button>
            </label>
          </OverlayPanel>
        </div>
      </div>
    </main>
  );
}