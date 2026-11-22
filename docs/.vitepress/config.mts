import { defineConfig } from 'vitepress'
import theorySidebar from './theory-sidebar.json'
// https://vitepress.dev/reference/site-config

// 1. 获取环境变量并判断
// 如果环境变量 EDGEONE 等于 '1'，说明在 EdgeOne 环境，使用根路径 '/'
// 否则默认是 GitHub Pages 环境，使用仓库子路径
const isEdgeOne = process.env.EDGEONE === '1'
// 仓库的地址和名称只在这里写一次，仓库转移或改名以后改这两行
const repoUrl = 'https://github.com/ruyiluo/agentic-robotics'
const repoName = 'agentic-robotics'
const baseConfig = isEdgeOne ? '/' : `/${repoName}/`

export default defineConfig({
  lang: 'zh-CN',
  title: "机器人智能体",
  description: "机器人智能体：原理、仿真与实战。从任务执行到技能演化与策略学习。",
  base: baseConfig,
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/datawhale-logo.png',
    nav: [
      { text: '理论教程', link: '/theory/' },
      { text: '仿真实验', link: '/simulation/' },
      { text: '真机实战', link: '/hardware/' },
    ],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一章', next: '下一章' },
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '外观',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // 中文的词之间没有空格。按词切分以后，句子中间的词才搜得到
            tokenize: (text: string) => {
              const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
              return Array.from(segmenter.segment(text)).filter(part => part.isWordLike).map(part => part.segment)
            }
          },
          searchOptions: {
            combineWith: 'AND',
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },
    // 理论部分的侧边栏由同步脚本按理论目录生成，见 theory-sidebar.json
    sidebar: [
      { text: '理论教程', items: [{ text: '目录', link: '/theory/' }] },
      ...theorySidebar,
      {
        text: '动手部分',
        items: [
          { text: '仿真实验（建设中）', link: '/simulation/' },
          { text: '真机实战（建设中）', link: '/hardware/' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: repoUrl }
    ],

    editLink: {
      pattern: `${repoUrl}/blob/main/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2026002630号-1</a> | <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010602202215" rel="noreferrer" target="_blank">京公网安备11010602202215号</a>',
      copyright: '本作品采用 <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）</a> 进行许可'
    }
  }
})
