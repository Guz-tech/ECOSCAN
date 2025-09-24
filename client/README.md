# MAIS SOBRE ECOSCAN

O projeto EcoScan nasceu da ideia de criar uma forma simples, prática e
educativa de ajudar as pessoas a descartarem o lixo corretamente. Ele funciona
basicamente como um sistema onde o usuário pode tirar uma foto de um lixo ou
escolher o tipo manualmente, e o sistema, por sua vez, vai mostrar qual é o tipo de
resíduo e como ele deve ser descartado. Além disso, a plataforma registra essas
informações, como o tipo de lixo, a data, o local aproximado onde aquilo foi
escaneado, e armazena tudo em um banco de dados. Esses dados vão sendo
acumulados e depois podem ser usados para gerar relatórios e gráficos que mostram,
por exemplo, quais tipos de resíduos estão sendo mais descartados em determinadas
regiões, quais horários têm mais descarte, e até em quais locais há mais necessidade
de ações ambientais.
A primeira versão do projeto, o que a gente chama de MVP (ou Produto Mínimo
Viável), é uma versão mais simples do sistema, feita com o essencial para que a ideia
principal funcione. O MVP precisa ter um site com algumas páginas básicas: uma tela
de login e cadastro, uma tela onde o usuário pode fazer o envio da imagem do lixo ou
selecionar o tipo manualmente (caso ainda não tenha a inteligência artificial
funcionando), uma tela que mostra o resultado do escaneamento com uma mensagem
educativa, e uma tela de painel, onde o usuário ou o administrador pode ver um
resumo dos tipos de lixo que foram identificados.
Por trás do site, precisa ter um sistema que processe as informações. Esse
sistema é o que recebe os dados da imagem ou do tipo escolhido, consulta no banco
qual é a mensagem educativa certa para aquele tipo de lixo e devolve isso para a
interface do usuário. Ele também é responsável por guardar no banco de dados todos
os registros dos escaneamentos feitos, para que mais tarde esses dados possam ser
usados na criação dos gráficos e mapas.
Falando sobre o banco de dados, ele é onde tudo fica armazenado: os usuários
cadastrados, os lixos escaneados, as frases educativas e as regiões simuladas (como
bairros ou locais da UNAMA, por exemplo). Tudo isso é necessário para que o sistema
funcione de forma completa, mesmo que ainda de forma simples.

Agora, o que torna o projeto ainda mais especial é que, nessa primeira fase,
ele será voltado para ser aplicado dentro da UNAMA, como um teste real, mas
também poderá ser adaptado para outros locais estratégicos, como o Hangar Centro
de Convenções, onde vão acontecer eventos da COP30. A ideia é que, nesses
espaços, a gente consiga identificar como as pessoas estão descartando seus
resíduos e usar esses dados para melhorar a coleta seletiva, promover campanhas
educativas e até influenciar decisões maiores sobre sustentabilidade dentro da
universidade ou nos eventos.
Mesmo que o sistema ainda não tenha uma inteligência artificial completa
funcionando no início, o mais importante é que ele já mostre o fluxo acontecendo: o
usuário acessa, interage, o sistema responde, os dados são armazenados, e eles
aparecem no painel. Isso já é suficiente para apresentar o funcionamento, mostrar o
impacto e provar que a ideia tem valor e pode ser expandida.
Então, em resumo, o que de fato precisa estar pronto pra essa entrega é um
site funcional que permita o login, o envio de uma imagem ou escolha do tipo de lixo,
o retorno com uma mensagem educativa, e um painel simples com alguns gráficos.
Tudo isso conectado a um banco de dados e a um sistema que faça essa ponte entre
o usuário e os dados. Com isso, mesmo em sua versão mais básica, o EcoScan já se
mostra útil, educativo e com grande potencial de impacto social e ambiental.
