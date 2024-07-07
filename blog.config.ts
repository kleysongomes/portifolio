// Purpose: This file is used to configure the blog, including the author, title, description, and other settings.
import { link } from "fs";
import Intro from "./app/intro.mdx";

const siteData: any = {
  author: "Kleyson", // author name
  title: "Kleyson Gomes", // website title
  description:
    "Um blog minimalista para artigos e meu desenvolvimento pessoal como desenvolvedor", // website description
  theme: "light", // light | dark
  language: "pt-BR", // zh-CN | en
  githubRepo: "https://github.com/kleysongomes/portifolio", // your blog's github repo

  // how to change the favicon of the website?
  // change the app/favicon.ico file directly，or refer to the document below
  // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

  //header config
  header: {
    logo: "/logo.png", //  /public/logo.png
    title: "Kleyson Gomes", // header title

    // navigation bar
    routes: [
      {
        name: "Projetos",
        value: "/projects",
      },

      {
        name: "Currículo",
        value:
          "https://drive.google.com/file/d/1PuxLrOcSetEq-YoeWmSwXpl3_ENvAfuF/view?usp=drive_link",
      },
    ],
  },

  home: {
    title: "Iae, vamos lá?", // homepage title

    // introduction or about me
    intro: Intro, // file path of the introduction
    socials: {
      email: "kleysongomes7@gmail.com",
      github: "https://github.com/kleysongomes",
      linkedin: "https://www.linkedin.com/in/kleyson-gomes-060a99115/",
      facebook: "",
      instagram: "https://www.instagram.com/_kleyson/",
      youtube: "",
    },
  },

  project: {
    title: "O que eu tenho feito e contribuido:",
    description:
      "Um resumo de todos os projetos que tenho participado, seja como analista ou desenvolvedor.",

    // name, description, link are required
    // github: the address of the project's github repo
    // status: active | inactive
    // and so on
    // you can add more fields according to your needs ,but you need to modify the code in the projects/page.tsx file
    projects: [
        {
            name: "Desbravalink",
            description:
              "Site principal de startup em que sou fundador, onde ajudamos pessoas a ganharem experiência profissional através de projetos reais.",
            link: "https://desbravalink.com.br/",
            status: "pub",
          },
          {
            name: "Beeework",
            description:
              "Sistemas de recrutamento e seleção para empresas, onde temos uma abordagem mais humanizada e focada em diversidade.",
            link: "https://beeework-frontend-desbravalinks-projects.vercel.app/",
            status: "pub",
          },
      {
        name: "Mobile",
        description:
          "Nossa página na Google Play Store, onde você pode encontrar uma relação com todos os aplicativos que atuei e estão publicados.",
        link: "https://play.google.com/store/apps/dev?id=5387164277767526968",
        github: "",
        status: "pub",
      },
      {
        name: "Pomodoro",
        description: "Um timer de pomodoro simples, feito em HTML, CSS e JS.",
        link: "https://pomodoro.desbravalink.com.br/",
        github: "hhttps://github.com/kleysongomes/PomodoroTimer",
        status: "pub",
      },
      {
        name: "TOTVS - Protheus",
        description: "Exemplos de rotinas e customizações em Protheus, ERP da TOTVS.",
        link: "https://github.com/kleysongomes/Advpl",
        github: "https://github.com/kleysongomes/Advpl",
        status: "git",
      },
      {
        name: "Inventário RP",
        description: "Um sistema de inventário simples, como MOD para o game Grand Theft Auto V (GTA 5).",
        link: "https://github.com/kleysongomes/inventarioRP",
        github: "https://github.com/kleysongomes/inventarioRP",
        status: "git",
      },
      {
        name: "JumpRUM",
        description: "Game desenvolvido em HTML, CSS e JS, onde o objetivo é pular e desviar de obstáculos.",
        link: "https://game-jump-run.vercel.app/",
        github: "https://github.com/kleysongomes/gameJumpRun",
        status: "pub",
      },
    
     
    ],
    // status color and text
    getStatus: (status: string) => {
      switch (status) {
        case "pub":
          return {
            variant: "default",
            text: "PUBLICADO",
          };
        case "git":
          return {
            variant: "default",
            text: "GIT",
          };
        default:
          return {
            variant: "default",
            text: "DEV",
          };
      }
    },

    view: "list", // grid | list

    target: "_blank", // _blank | _self | _parent | _top
  },
};

export default siteData;
