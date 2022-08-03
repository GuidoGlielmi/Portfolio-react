import {createContext, useMemo, useCallback, useContext} from 'react';
import useFetch from 'components/custom-hooks/useFetch';
import {userFeedbackContext} from '../user-feedback/UserFeedbackContext';

export const userContext = createContext();

export default function UserContext({children}) {
  const {makeRequest} = useContext(userFeedbackContext);

  const [loadingUser, user, setUser] = useFetch({url: 'users'}, [], 0);

  const [loadingEducations, educations, setEducations] = useFetch({url: 'education'});

  const [loadingExperiences, experiences, setExperiences] = useFetch({url: 'experiences'});

  const [loadingProjects, projects, setProjects] = useFetch({url: 'projects'});

  const [loadingSkills, skills, setSkills] = useFetch({url: 'skills'});

  const [loadingTechs, techs, setTechs] = useFetch({url: 'techs'});

  const saveUser = useCallback(async () => {
    await makeRequest({url: 'users', body: user, method: 'put'}, 'User modified');
  }, [user, makeRequest]);

  const contextObj = useMemo(
    () => ({
      user,
      setUser,
      loadingUser,
      techs,
      setTechs,
      loadingTechs,
      saveUser,
      loadingEducations,
      educations,
      setEducations,
      loadingExperiences,
      experiences,
      setExperiences,
      loadingProjects,
      projects,
      setProjects,
      loadingSkills,
      skills,
      setSkills,
    }),
    [
      educations,
      experiences,
      loadingEducations,
      loadingExperiences,
      loadingProjects,
      loadingSkills,
      loadingTechs,
      loadingUser,
      projects,
      saveUser,
      setEducations,
      setExperiences,
      setProjects,
      setSkills,
      setTechs,
      setUser,
      skills,
      techs,
      user,
    ],
  );

  return <userContext.Provider value={contextObj}>{children}</userContext.Provider>;
}
