import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="User Profile" style={{ borderRadius: '8px'}} />
    </Box>
);
}

export default function Home() {
const githubUser = 'matgomes21';

  return (
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser} />
      </div>
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          Bem vindo
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <Box>
          Pessoas
        </Box>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
  );
}
