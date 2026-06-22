export async function parseProjectUrl(
  url: string,
  overwrite = "",
): Promise<string> {
  const Url = new URL(url, "https://www.ccw.site/gandi/project/");
  if (overwrite) {
    return encodeURI(
      `${await parseProjectUrl(url)}?overwrite=${JSON.stringify(await parseSb3ForOverwrite(overwrite))}`,
    );
  }
  if (!url.includes("/")) {
    return encodeURI(`https://www.ccw.site/gandi/project/${url}`);
  }
  if (url.includes("detail")) {
    return encodeURI(
      `https://www.ccw.site/gandi/project/${Url.pathname.split("/").at(-1)}`,
    );
  }
  return encodeURI(Url.toString());
}

export async function parseSb3ForOverwrite(url: string): Promise<{
  projectLink: string;
  title: string;
}> {
  const Url = new URL(url, "https://www.ccw.site/gandi/project/");
  if (url.endsWith(".sb3")) {
    return { projectLink: Url.pathname.split("/").at(-1)!, title: "" };
  }
  const projectId = Url.pathname.split("/").at(-1);
  const res: {
    body: {
      creationRelease: {
        projectLink: string;
      };
      title: string;
    };
  } = await fetch("https://community-web.ccw.site/creation/detail", {
    method: "POST",
    body: JSON.stringify({
      oid: projectId,
      accessKey: "",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  const {
    body: {
      creationRelease: { projectLink },
      title,
    },
  } = res;
  const projectUrl = new URL(projectLink);
  return { projectLink: projectUrl.pathname, title };
}
