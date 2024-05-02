export enum EnumMailTemplate {
  Magic_link = "magic_link.html",
}

export function getMailSubject(template: EnumMailTemplate): string {
  switch (template) {
    case EnumMailTemplate.Magic_link:
      return `Votre lien de connexion`;
    default:
      return "";
  }
}
