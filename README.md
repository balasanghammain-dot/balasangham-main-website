# Balasangham Kannur Official Website: Project Specifications & Research

This repository contains the verified research, design specifications, and bilingual content dictionary for building the official bilingual website for **Balasangham Kannur District Committee** (ബാലസംഘം കണ്ണൂർ).

---

## 📁 Documentation Map

All specifications are organized in the [`docs/`](./docs/) directory to provide grounded truth and prevent hallucination during development:

| Document | Purpose |
| :--- | :--- |
| [`docs/ORGANIZATION_KB.md`](./docs/ORGANIZATION_KB.md) | Single Source of Truth (SSOT) on Balasangham's history (founded 1938 in Kalliasseri), motto (*"പഠനം, മനനം, ചലനം"*), symbols, and full official Flag Song (*"ഉണരുക ഉയരുക ശുഭ്രപതാകേ"*). |
| [`docs/EVENT_CONFERENCE_2026.md`](./docs/EVENT_CONFERENCE_2026.md) | Complete specification for the **Event Page** based on the official poster: *"പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻"*, Kannur District Conference at Kalliasseri on October 10-11, 2026, countdown timer, agenda, and transit routes. |
| [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | UI tokens, color palette (Revolutionary Red `#D32F2F`, White `#FFFFFF`, Charcoal `#121826`, Gold `#F59E0B`), typography (English + Malayalam fonts), and component guidelines. |
| [`docs/CONTENT_I18N.md`](./docs/CONTENT_I18N.md) | Full side-by-side English and Malayalam strings for every component, nav item, hero card, and event schedule item. |
| [`docs/MAIN_AGENT_PROMPT.md`](./docs/MAIN_AGENT_PROMPT.md) | Ready-to-use prompt to instruct the primary website builder agent with zero ambiguity. |

---

## 🚀 Quick Handoff to Builder Agent

To generate the website, provide the prompt contained in [`docs/MAIN_AGENT_PROMPT.md`](./docs/MAIN_AGENT_PROMPT.md) to your coding agent.
