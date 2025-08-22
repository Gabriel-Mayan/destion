import {
  AccountBalance,
  AddBox,
  AssignmentInd,
  BarChart,
  CarRental,
  CorporateFare,
  Description as DescriptionIcon,
  EmailOutlined,
  ListAlt,
  Note,
  NoteAddOutlined,
  People,
  PeopleAlt,
  PostAdd,
  StoreOutlined,
  StorefrontOutlined,
  TrendingUp,
} from "@mui/icons-material";

export default function getNavigation(session: any) {
  const navigation = [];
  const { usePlacaFipe, useTemPf, useTemPj, isFormalizador } = session;

  const formularios = [
    { kind: "header", title: "Enviar Proposta" },
    { title: "Proposta", segment: "/profile/financiamento", icon: <DescriptionIcon /> },
    { title: "Proposta (Alfa/Safra)", segment: "/profile/financiamento/alfa&safra", icon: <DescriptionIcon /> },
  ];

  const lojaCredenciada = [
    { kind: "divider" },
    { kind: "header", title: "Credenciamento de Loja" },
    { title: "Criar Acesso", segment: "/profile/loja/cadastro", icon: <StoreOutlined /> },
    { title: "Credenciar (Dayco/Simpala)", segment: "/profile/loja/credenciamento", icon: <StorefrontOutlined /> },
  ];

  const admin = [
    { kind: "divider" },
    { kind: "header", title: "Administração" },
    {
      title: "Produção Mensal",
      icon: <NoteAddOutlined />,
      segment: "https://docs.google.com/spreadsheets/d/1RDKjujhvoEFNwrdrQJuOFt6Kaei0bvWSxtAwFINgoWE/edit?gid=1091763959#gid=1091763959",
    },
    {
      title: "Operadores",
      kind: "group",
      icon: <People />,
      children: [
        { title: "Listagem", segment: `/em-construcao`, icon: <ListAlt /> },
        { title: "Cadastro", segment: `/profile/admin/operador/cadastro`, icon: <AddBox /> },
      ],
    },
    {
      title: "Lojas Credenciadas",
      kind: "group",
      icon: <StoreOutlined />,
      children: [
        { title: "Listagem", segment: `/em-construcao`, icon: <ListAlt /> },
        { title: "Cadastro", segment: `/profile/admin/loja-credenciada/cadastro`, icon: <AddBox /> },
      ],
    },
    {
      title: "Bancos",
      kind: "group",
      icon: <AccountBalance />,
      children: [
        { title: "Listagem", segment: `/profile/admin/banco`, icon: <ListAlt /> },
        { title: "Cadastro", segment: `/profile/admin/banco/cadastro`, icon: <AddBox /> },
      ],
    },
    {
      title: "Perfis de Progressão",
      kind: "group",
      icon: <TrendingUp />,
      children: [
        { title: "Listagem", segment: `/profile/admin/banco/perfil-de-progressao`, icon: <ListAlt /> },
        { title: "Cadastro", segment: `/profile/admin/banco/perfil-de-progressao/cadastro`, icon: <AddBox /> },
      ],
    },
  ];

  const linksUteis = [
    { kind: "divider" },
    { kind: "header", title: "Links Úteis" },
    { title: "Delta Mail", segment: "https://webmail.deltacapital.com.br/", icon: <EmailOutlined /> },
    { title: "Demais Produtos", segment: "https://www.deltacapital.com.br/services.html", icon: <Note /> },
  ];

  const consultasBases: any = [];

  navigation.push(...formularios);
  navigation.push(...lojaCredenciada);

  if (usePlacaFipe || useTemPf || useTemPj) {
    consultasBases.push({ kind: "divider" }, { kind: "header", title: "Consultar Bases" });

    if (usePlacaFipe) {
      consultasBases.push({ title: "Placa-Fipe", segment: "/profile/consulta-base/veiculo", icon: <CarRental /> });
    }

    if (useTemPf) {
      consultasBases.push({ title: "Buscar CPF", segment: "/profile/consulta-base/pessoa-fisica", icon: <PeopleAlt /> });
    }

    if (useTemPj) {
      consultasBases.push({ title: "Buscar CNPJ", segment: "/profile/consulta-base/pessoa-juridica", icon: <CorporateFare /> });
    }
  }

  navigation.push(...consultasBases);

  const producaoMensal = [
    { kind: "divider" },
    { kind: "header", title: "Produção Mensal" },
    { title: "Visualizar", segment: "/profile/producao-mensal", icon: <BarChart /> },
    { title: "Cadastrar Venda", segment: "/profile/producao-mensal/cadastro", icon: <PostAdd /> },
  ];

  if (isFormalizador) {
    producaoMensal.push({ title: "Listagem Do Formalizador", segment: "/profile/producao-mensal/formalizador", icon: <AssignmentInd /> });
  }

  navigation.push(...producaoMensal);
  navigation.push(...linksUteis);

  if (session.isAdmin) {
    navigation.push(...admin);
  }

  return navigation;
}
