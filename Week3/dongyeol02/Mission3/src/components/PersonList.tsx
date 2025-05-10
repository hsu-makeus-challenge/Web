import React from "react";
import PersonCard from "./PersonCard";

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
}

interface PersonListProps {
  people: Person[];
}

const PersonList = (personlist: PersonListProps): Element => {
  return (
    <div className="mb-8">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {personlist.people.slice(0, 10).map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            profile_path={person.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonList;
