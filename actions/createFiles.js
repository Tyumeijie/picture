import readLocalFiles from '../readLocalFiles';

const createFiles = (octokit, configs) => {
  const { owner, repo, basepath } = configs;

  const createFile = ({ owner, repo, path, message, content }) => {
    octokit.repos
      .createFile({
        owner,
        repo,
        path,
        message,
        content
      })
      .then(({ data, status }) => {
        if (String(status).startsWith('2')) {
          console.log(`${data.content.path} created.`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  readLocalFiles('./jjjj').then((files) => {
    files.forEach((file) => {
      // Github expect context to be Base64-encoded
      const content = file.content.toString('base64');
      // Remove `./` or `../` prefix
      const name = file.name.replace(/\.+\//g, '');

      const path = basepath === '' ? `${encodeURI(name)}` : `${basepath}/${encodeURI(name)}`;
      const message = `create ${name}`;

      createFile({ owner, repo, path, message, content });
    });
  });
};

export default createFiles;
