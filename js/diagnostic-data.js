/**
 * Diagnostic tree data structure
 * This file contains all the diagnostic steps, questions, and paths
 * for the network troubleshooting guide
 */

const diagnosticTree = {
    start: {
        id: 'start',
        text: 'Qual é o principal problema que você está enfrentando?',
        details: 'Selecione a opção que melhor descreve a sua situação para iniciarmos o diagnóstico.',
        options: [
            { text: 'Sem acesso à Internet em nenhum dispositivo', next_id: 'no_internet_all_devices_intro' },
            { text: 'Wi-Fi lento ou instável', next_id: 'wifi_slow_unstable_intro' },
            { text: 'Não consigo ligar à rede Wi-Fi', next_id: 'wifi_cannot_connect_intro' },
            { text: 'Websites não carregam (outros apps podem funcionar)', next_id: 'websites_not_loading_intro' },
            { text: 'Um dispositivo específico não acede à Internet (outros sim)', next_id: 'specific_device_no_internet_intro' }
        ]
    },
    // Path 1: Sem acesso à Internet em nenhum dispositivo
    no_internet_all_devices_intro: {
        id: 'no_internet_all_devices_intro',
        text: 'Diagnóstico: Sem acesso à Internet em nenhum dispositivo.',
        details: 'Vamos verificar alguns pontos cruciais.',
        options: [{ text: 'Continuar', next_id: 'check_modem_router_lights' }]
    },
    check_modem_router_lights: {
        id: 'check_modem_router_lights',
        text: 'Verifique as luzes do seu modem e router. As luzes de "Power", "Internet" (ou WAN/DSL/Link) e "Wi-Fi" (se aplicável) estão acesas e estáveis (geralmente verdes)?',
        details: 'Consulte o manual do seu equipamento para o significado específico das luzes. Luzes piscando ou apagadas podem indicar problemas.',
        options: [
            { text: 'Sim, todas as luzes relevantes parecem normais', next_id: 'try_reboot_modem_router' },
            { text: 'Não, algumas luzes estão apagadas ou piscando de forma anormal', next_id: 'solution_modem_router_lights_issue' }
        ]
    },
    solution_modem_router_lights_issue: {
        id: 'solution_modem_router_lights_issue',
        text: 'Problema com as luzes do modem/router:',
        details: 'Se as luzes indicam um problema (ex: sem sinal, falha de autenticação), o problema pode ser com o equipamento ou com a ligação do seu Provedor de Internet (ISP). \n1. Verifique todas as ligações de cabos (energia, cabo de rede/telefone/fibra). \n2. Tente reiniciar o modem e o router (desligue da tomada, espere 1 minuto, ligue primeiro o modem, espere estabilizar, depois o router). \n3. Se o problema persistir, contacte o seu ISP, pois pode haver uma interrupção de serviço na sua área ou um problema com a sua linha/equipamento.',
        options: [
            { text: 'Tentei reiniciar e verifiquei cabos, problema persiste', next_id: 'solution_contact_isp' },
            { text: 'Reiniciar resolveu!', next_id: 'end_thank_you' },
            { text: 'Voltar ao início', next_id: 'start' }
        ]
    },
    try_reboot_modem_router: {
        id: 'try_reboot_modem_router',
        text: 'Mesmo com as luzes normais, um reinício pode ajudar. Já tentou reiniciar o modem e o router na sequência correta?',
        details: 'Desligue ambos da tomada. Aguarde 1 minuto. Ligue primeiro o modem, espere todas as luzes estabilizarem (pode levar alguns minutos). Depois, ligue o router e espere estabilizar.',
        options: [
            { text: 'Sim, já reiniciei corretamente e não resolveu', next_id: 'check_isp_outage' },
            { text: 'Não, vou tentar reiniciar agora', next_id: 'solution_reboot_pending' }
        ]
    },
    solution_reboot_pending: {
        id: 'solution_reboot_pending',
        text: 'Aguarde a reinicialização completa dos equipamentos.',
        details: 'Este processo pode demorar alguns minutos. Após a reinicialização, teste a ligação à internet.',
        options: [
            { text: 'Reiniciar resolveu o problema!', next_id: 'end_thank_you' },
            { text: 'Reiniciei, mas o problema continua', next_id: 'check_isp_outage' }
        ]
    },
    check_isp_outage: {
        id: 'check_isp_outage',
        text: 'Existe alguma interrupção de serviço conhecida do seu Provedor de Internet (ISP)?',
        details: 'Verifique o site do seu ISP, redes sociais, ou contacte-os para saber se há problemas na sua região.',
        options: [
            { text: 'Sim, há uma interrupção confirmada', next_id: 'solution_isp_outage_confirmed' },
            { text: 'Não, o ISP informa que não há interrupções', next_id: 'solution_contact_isp_further_diag' }
        ]
    },
    solution_isp_outage_confirmed: {
        id: 'solution_isp_outage_confirmed',
        text: 'Interrupção de serviço do ISP confirmada.',
        details: 'Neste caso, é necessário aguardar que o seu ISP resolva o problema. Não há muito que possa ser feito do seu lado.',
        options: [{ text: 'Entendido, obrigado!', next_id: 'end_thank_you_isp' }]
    },
    solution_contact_isp_further_diag: {
        id: 'solution_contact_isp_further_diag',
        text: 'Contacte o seu ISP para diagnóstico avançado.',
        details: 'Se todos os passos anteriores foram verificados e não há interrupção geral, o problema pode ser específico da sua ligação ou equipamento e requer suporte técnico do seu ISP.',
        options: [{ text: 'Entendido, vou contactar o ISP', next_id: 'end_thank_you_isp' }]
    },

    // Path 2: Wi-Fi lento ou instável
    wifi_slow_unstable_intro: {
        id: 'wifi_slow_unstable_intro',
        text: 'Diagnóstico: Wi-Fi lento ou instável.',
        details: 'Vamos investigar as possíveis causas.',
        options: [{ text: 'Continuar', next_id: 'wifi_slow_affects_all_devices' }]
    },
    wifi_slow_affects_all_devices: {
        id: 'wifi_slow_affects_all_devices',
        text: 'O problema de lentidão ou instabilidade afeta todos os dispositivos ligados ao Wi-Fi ou apenas um específico?',
        options: [
            { text: 'Afeta todos os dispositivos', next_id: 'wifi_slow_check_router_location' },
            { text: 'Afeta apenas um dispositivo específico', next_id: 'specific_device_no_internet_intro' } // Reutiliza parte do fluxo
        ]
    },
    wifi_slow_check_router_location: {
        id: 'wifi_slow_check_router_location',
        text: 'Verifique a localização do seu router. Ele está num local central, elevado e livre de obstruções (paredes grossas, móveis grandes)?',
        details: 'Fontes de interferência como micro-ondas, telefones sem fio, dispositivos Bluetooth próximos também podem afetar o sinal.',
        options: [
            { text: 'Sim, o router está bem posicionado e longe de interferências óbvias', next_id: 'wifi_slow_check_channel_band' },
            { text: 'Não, vou tentar melhorar a posição do router ou afastar interferências', next_id: 'solution_reposition_router' }
        ]
    },
    solution_reposition_router: {
        id: 'solution_reposition_router',
        text: 'Ajuste a posição do router.',
        details: 'Tente colocar o router num local mais central e elevado, e afaste possíveis fontes de interferência. Teste a velocidade e estabilidade após o ajuste.',
        options: [
            { text: 'Melhorou!', next_id: 'end_thank_you' },
            { text: 'Não houve melhora significativa', next_id: 'wifi_slow_check_channel_band' }
        ]
    },
    wifi_slow_check_channel_band: {
        id: 'wifi_slow_check_channel_band',
        text: 'Já tentou mudar o canal ou a banda de frequência do Wi-Fi (ex: de 2.4GHz para 5GHz, se disponível)?',
        details: 'A banda de 2.4GHz tem maior alcance mas é mais suscetível a interferências. A de 5GHz oferece velocidades mais rápidas e menos interferência, mas tem menor alcance. Aceda à página de configuração do router para estas alterações (consulte o manual do router).',
        options: [
            { text: 'Sim, já tentei e não resolveu', next_id: 'wifi_slow_reboot_all' },
            { text: 'Não, vou tentar verificar/alterar', next_id: 'solution_change_wifi_channel_band' }
        ]
    },
    solution_change_wifi_channel_band: {
        id: 'solution_change_wifi_channel_band',
        text: 'Altere o canal ou banda do Wi-Fi.',
        details: 'Aceda às configurações do seu router e tente selecionar um canal Wi-Fi menos congestionado (para 2.4GHz, canais 1, 6 ou 11 são geralmente recomendados) ou mude para a banda de 5GHz se os seus dispositivos forem compatíveis e estiverem próximos o suficiente do router. Teste a ligação após a alteração.',
        options: [
            { text: 'Alterar o canal/banda resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu ou não sei como fazer', next_id: 'wifi_slow_reboot_all' }
        ]
    },
    wifi_slow_reboot_all: {
        id: 'wifi_slow_reboot_all',
        text: 'Tente reiniciar todos os equipamentos: modem, router e os dispositivos afetados.',
        details: 'Desligue tudo, aguarde 1 minuto. Ligue o modem, espere estabilizar. Ligue o router, espere estabilizar. Por fim, ligue os dispositivos.',
        options: [
            { text: 'Reiniciar tudo resolveu!', next_id: 'end_thank_you' },
            { text: 'Já fiz isso e não resolveu', next_id: 'wifi_slow_speed_test' }
        ]
    },
    wifi_slow_speed_test: {
        id: 'wifi_slow_speed_test',
        text: 'Realize um teste de velocidade da sua internet (ex: Speedtest.net, Fast.com). A velocidade medida é significativamente inferior à contratada com o seu ISP?',
        details: 'Faça o teste com um computador ligado diretamente ao router via cabo Ethernet, se possível, para uma medição mais precisa.',
        options: [
            { text: 'Sim, a velocidade está muito abaixo da contratada', next_id: 'solution_contact_isp_slow_speed' },
            { text: 'Não, a velocidade está próxima da contratada (problema pode ser outro)', next_id: 'wifi_slow_check_device_usage' }
        ]
    },
    solution_contact_isp_slow_speed: {
        id: 'solution_contact_isp_slow_speed',
        text: 'Velocidade abaixo da contratada.',
        details: 'Se os testes de velocidade (especialmente via cabo) confirmam que a velocidade está consistentemente abaixo do seu plano, contacte o seu ISP. Pode haver um problema com a sua linha, configuração ou um problema mais amplo na rede deles.',
        options: [{ text: 'Entendido, vou contactar o ISP', next_id: 'end_thank_you_isp' }]
    },
    wifi_slow_check_device_usage: {
        id: 'wifi_slow_check_device_usage',
        text: 'Verifique o uso da rede. Há muitos dispositivos a usar a internet intensivamente ao mesmo tempo (streaming, downloads, jogos online)?',
        details: 'A largura de banda da sua ligação é partilhada entre todos os dispositivos. O uso intensivo pode causar lentidão para outros.',
        options: [
            { text: 'Sim, pode ser esse o caso', next_id: 'solution_manage_bandwidth_usage' },
            { text: 'Não, o uso é leve e mesmo assim está lento/instável', next_id: 'solution_router_firmware_or_isp_contact' }
        ]
    },
    solution_manage_bandwidth_usage: {
        id: 'solution_manage_bandwidth_usage',
        text: 'Gestão do uso da largura de banda.',
        details: 'Tente reduzir o número de atividades que consomem muita largura de banda simultaneamente. Alguns routers oferecem QoS (Qualidade de Serviço) para priorizar tráfego. Considere um plano de internet com maior velocidade se o uso frequente for alto.',
        options: [
            { text: 'Gerir o uso ajudou!', next_id: 'end_thank_you' },
            { text: 'Mesmo com uso leve, o problema persiste', next_id: 'solution_router_firmware_or_isp_contact'}
        ]
    },
    solution_router_firmware_or_isp_contact: {
        id: 'solution_router_firmware_or_isp_contact',
        text: 'Possíveis próximos passos para Wi-Fi lento/instável:',
        details: '1. Verifique se há atualizações de firmware para o seu router (consulte o site do fabricante). \n2. O router pode ser antigo ou defeituoso. \n3. Se nada resolver, pode ser necessário contactar o seu ISP para uma análise mais aprofundada da sua ligação ou para verificar a compatibilidade do seu router com o serviço.',
        options: [
            { text: 'Vou verificar o firmware/router', next_id: 'end_thank_you_research' },
            { text: 'Vou contactar o ISP', next_id: 'end_thank_you_isp' }
        ]
    },

    // Path 3: Não consigo ligar à rede Wi-Fi
    wifi_cannot_connect_intro: {
        id: 'wifi_cannot_connect_intro',
        text: 'Diagnóstico: Não consigo ligar à rede Wi-Fi.',
        details: 'Vamos verificar os motivos mais comuns.',
        options: [{ text: 'Continuar', next_id: 'wifi_connect_check_password' }]
    },
    wifi_connect_check_password: {
        id: 'wifi_connect_check_password',
        text: 'A palavra-passe do Wi-Fi está correta? Verifique com atenção maiúsculas, minúsculas e caracteres especiais.',
        options: [
            { text: 'Sim, tenho certeza que está correta', next_id: 'wifi_connect_check_ssid' },
            { text: 'Não, vou tentar inserir novamente', next_id: 'solution_reenter_password_connect' },
            { text: 'Não sei/esqueci a palavra-passe', next_id: 'solution_find_wifi_password' }
        ]
    },
    solution_reenter_password_connect: {
        id: 'solution_reenter_password_connect',
        text: 'Reinsira a palavra-passe.',
        details: 'Tente inserir a palavra-passe do Wi-Fi novamente. Se o problema persistir, continue.',
        options: [
            { text: 'Consegui ligar!', next_id: 'end_thank_you' },
            { text: 'Ainda não consigo ligar', next_id: 'wifi_connect_check_ssid' }
        ]
    },
    solution_find_wifi_password: {
        id: 'solution_find_wifi_password',
        text: 'Como encontrar a palavra-passe do Wi-Fi:',
        details: '1. Verifique uma etiqueta no seu router. \n2. Se acedeu à configuração do router antes, ela estará lá. \n3. Em computadores já ligados, pode ser possível ver a palavra-passe guardada. \n4. Como último recurso, pode ser necessário resetar o router para as configurações de fábrica (isto apagará todas as configurações).',
        options: [
            { text: 'Encontrei e vou tentar novamente', next_id: 'wifi_connect_check_password' },
            { text: 'Preciso de mais ajuda com isto', next_id: 'solution_router_reset_warning' }
        ]
    },
    solution_router_reset_warning: {
        id: 'solution_router_reset_warning',
        text: 'Resetar o Router (Atenção!)',
        details: 'Resetar o router para as configurações de fábrica apagará todas as suas personalizações (nome da rede, palavra-passe, etc.). A palavra-passe padrão estará numa etiqueta no router. Só faça isto se souber como reconfigurá-lo ou se for a única opção.',
        options: [
            { text: 'Entendido, vou tentar outras opções primeiro', next_id: 'wifi_connect_check_ssid' },
            { text: 'Vou proceder com o reset', next_id: 'end_thank_you_research' }
        ]
    },
    wifi_connect_check_ssid: {
        id: 'wifi_connect_check_ssid',
        text: 'O nome da rede Wi-Fi (SSID) que está a tentar ligar é o correto?',
        details: 'Verifique se não está a tentar ligar-se a uma rede de um vizinho ou a uma rede antiga.',
        options: [
            { text: 'Sim, o SSID está correto', next_id: 'wifi_connect_check_wifi_on_device' },
            { text: 'Não, selecionei o SSID errado', next_id: 'solution_select_correct_ssid' }
        ]
    },
    solution_select_correct_ssid: {
        id: 'solution_select_correct_ssid',
        text: 'Selecione o SSID correto.',
        details: 'Na lista de redes Wi-Fi disponíveis no seu dispositivo, certifique-se de que seleciona o nome da sua rede Wi-Fi. Tente ligar novamente.',
        options: [
            { text: 'Consegui ligar!', next_id: 'end_thank_you' },
            { text: 'Ainda não consigo ligar com o SSID correto', next_id: 'wifi_connect_check_wifi_on_device' }
        ]
    },
    wifi_connect_check_wifi_on_device: {
        id: 'wifi_connect_check_wifi_on_device',
        text: 'O Wi-Fi está ativo no seu dispositivo? O modo avião está desativado?',
        options: [
            { text: 'Sim, Wi-Fi ativo e modo avião desligado', next_id: 'wifi_connect_forget_network' },
            { text: 'Não, vou ativar o Wi-Fi / desativar modo avião', next_id: 'solution_enable_wifi_on_device' }
        ]
    },
    solution_enable_wifi_on_device: {
        id: 'solution_enable_wifi_on_device',
        text: 'Ative o Wi-Fi / Desative o Modo Avião.',
        details: 'Certifique-se de que a funcionalidade Wi-Fi do seu dispositivo está ligada e que o modo avião está desligado. Tente ligar-se à rede novamente.',
        options: [
            { text: 'Consegui ligar!', next_id: 'end_thank_you' },
            { text: 'Ainda não consigo ligar', next_id: 'wifi_connect_forget_network' }
        ]
    },
    wifi_connect_forget_network: {
        id: 'wifi_connect_forget_network',
        text: 'Tente "Esquecer a Rede" no seu dispositivo e depois ligue-se novamente, inserindo a palavra-passe.',
        details: 'Isto pode limpar configurações antigas ou problemáticas.',
        options: [
            { text: 'Fiz isso e resolveu!', next_id: 'end_thank_you' },
            { text: 'Fiz isso e não resolveu', next_id: 'wifi_connect_reboot_device_router' }
        ]
    },
    wifi_connect_reboot_device_router: {
        id: 'wifi_connect_reboot_device_router',
        text: 'Reinicie o seu dispositivo e também o seu router.',
        details: 'Um simples reinício pode resolver falhas temporárias.',
        options: [
            { text: 'Reiniciar resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu', next_id: 'wifi_connect_check_mac_filter' }
        ]
    },
    wifi_connect_check_mac_filter: {
        id: 'wifi_connect_check_mac_filter',
        text: 'Verifique se o MAC Filtering está ativo no seu router e a impedir o seu dispositivo.',
        details: 'Esta é uma configuração de segurança avançada. Se não sabe o que é, é improvável que esteja ativo, a menos que outra pessoa tenha configurado a sua rede. Requer acesso à página de configuração do router.',
        options: [
            { text: 'MAC Filtering não está ativo ou não sei verificar', next_id: 'solution_wifi_connect_further_investigation' },
            { text: 'Sim, estava ativo e adicionei/desativei', next_id: 'end_thank_you' }
        ]
    },
    solution_wifi_connect_further_investigation: {
        id: 'solution_wifi_connect_further_investigation',
        text: 'Problema de ligação Wi-Fi persiste.',
        details: 'Se nenhum dos passos anteriores funcionou: \n1. Tente ligar outros dispositivos à mesma rede Wi-Fi. Se eles ligarem, o problema é específico do seu dispositivo (pode ser hardware, drivers, ou software). \n2. Se outros dispositivos também não ligarem, o problema é mais provável no router ou na ligação do ISP. Reveja os passos para "Sem acesso à Internet em nenhum dispositivo".',
        options: [
            { text: 'Outros dispositivos ligam (problema no meu dispositivo)', next_id: 'specific_device_no_internet_intro' },
            { text: 'Nenhum dispositivo liga', next_id: 'no_internet_all_devices_intro' },
            { text: 'Voltar ao início', next_id: 'start' }
        ]
    },

    // Path 4: Websites não carregam
    websites_not_loading_intro: {
        id: 'websites_not_loading_intro',
        text: 'Diagnóstico: Websites não carregam (mas outras apps podem funcionar, ex: email, streaming).',
        details: 'Isto sugere frequentemente um problema de DNS.',
        options: [{ text: 'Continuar', next_id: 'websites_not_loading_ping_ip' }]
    },
    websites_not_loading_ping_ip: {
        id: 'websites_not_loading_ping_ip',
        text: 'Consegue aceder a algum website se digitar o seu endereço IP diretamente no navegador (em vez do nome, ex: http://172.217.160.142 para Google)?',
        details: 'Pode encontrar IPs de sites usando ferramentas online de "Website IP lookup" a partir de outro dispositivo/rede, ou tentando o comando `ping nomedosite.com` no terminal.',
        options: [
            { text: 'Sim, consigo aceder por IP', next_id: 'solution_dns_issue_likely' },
            { text: 'Não, também não acedo por IP (ou não sei testar)', next_id: 'websites_not_loading_check_proxy_firewall' }
        ]
    },
    solution_dns_issue_likely: {
        id: 'solution_dns_issue_likely',
        text: 'Problema de DNS provável.',
        details: 'DNS (Domain Name System) traduz nomes de sites (google.com) em IPs. Se o acesso por IP funciona, o seu DNS não está a funcionar corretamente.',
        options: [{ text: 'O que posso fazer?', next_id: 'dns_flush_cache' }]
    },
    dns_flush_cache: {
        id: 'dns_flush_cache',
        text: 'Tente limpar a cache de DNS do seu dispositivo.',
        details: 'Windows: Abra o CMD como administrador e digite `ipconfig /flushdns`. \nmacOS: Abra o Terminal e digite `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. \nLinux: Varia, mas `sudo systemd-resolve --flush-caches` é comum.',
        options: [
            { text: 'Limpar a cache resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu', next_id: 'dns_change_servers' }
        ]
    },
    dns_change_servers: {
        id: 'dns_change_servers',
        text: 'Tente alterar os servidores DNS do seu dispositivo ou router para servidores públicos.',
        details: 'Exemplos: Google DNS (8.8.8.8 e 8.8.4.4) ou Cloudflare DNS (1.1.1.1 e 1.0.0.1). Pode configurar isto nas definições de rede do seu dispositivo ou na página de configuração do router.',
        options: [
            { text: 'Alterar DNS resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu ou não sei como fazer', next_id: 'websites_not_loading_check_proxy_firewall' }
        ]
    },
    websites_not_loading_check_proxy_firewall: {
        id: 'websites_not_loading_check_proxy_firewall',
        text: 'Verifique as configurações de proxy no seu navegador/sistema e o seu software de firewall/antivírus.',
        details: 'Configurações de proxy incorretas podem impedir o acesso a websites. Um firewall ou antivírus demasiado restritivo também pode bloquear ligações.',
        options: [
            { text: 'Verificar proxy/firewall resolveu!', next_id: 'end_thank_you' },
            { text: 'Não encontrei problemas ou não resolveu', next_id: 'solution_websites_not_loading_further_help' }
        ]
    },
    solution_websites_not_loading_further_help: {
        id: 'solution_websites_not_loading_further_help',
        text: 'Problema de carregamento de websites persiste.',
        details: 'Se o problema continuar, pode ser mais complexo. \n1. Teste em diferentes navegadores. \n2. Verifique se há malware no seu dispositivo. \n3. Se afeta todos os dispositivos, reveja os passos de "Sem acesso à Internet em nenhum dispositivo".',
        options: [
            { text: 'Vou tentar estas sugestões', next_id: 'end_thank_you_research' },
            { text: 'Voltar ao início', next_id: 'start' }
        ]
    },

    // Path 5: Um dispositivo específico não acede à Internet
    specific_device_no_internet_intro: {
        id: 'specific_device_no_internet_intro',
        text: 'Diagnóstico: Um dispositivo específico não consegue aceder à Internet (outros dispositivos na mesma rede funcionam normalmente).',
        details: 'Vamos focar no dispositivo problemático.',
        options: [{ text: 'Continuar', next_id: 'specific_device_check_connection_type' }]
    },
    specific_device_check_connection_type: {
        id: 'specific_device_check_connection_type',
        text: 'Este dispositivo está ligado por Wi-Fi ou cabo Ethernet?',
        options: [
            { text: 'Wi-Fi', next_id: 'specific_device_wifi_already_connected' },
            { text: 'Cabo Ethernet', next_id: 'specific_device_ethernet_check_cable' }
        ]
    },
    specific_device_wifi_already_connected: {
        id: 'specific_device_wifi_already_connected',
        text: 'Este dispositivo já se ligou a esta rede Wi-Fi antes com sucesso?',
        options: [
            { text: 'Sim, ligava-se normalmente antes', next_id: 'specific_device_reboot_device' },
            { text: 'Não, é a primeira vez ou sempre teve problemas', next_id: 'wifi_connect_check_password' } // Reutiliza parte do fluxo de ligação Wi-Fi
        ]
    },
    specific_device_reboot_device: {
        id: 'specific_device_reboot_device',
        text: 'Já tentou reiniciar este dispositivo específico?',
        options: [
            { text: 'Sim, reiniciei e não resolveu', next_id: 'specific_device_check_ip_settings' },
            { text: 'Não, vou reiniciar agora', next_id: 'solution_specific_device_reboot_pending' }
        ]
    },
    solution_specific_device_reboot_pending: {
        id: 'solution_specific_device_reboot_pending',
        text: 'Aguarde a reinicialização do dispositivo.',
        details: 'Após reiniciar, teste a ligação à internet.',
        options: [
            { text: 'Reiniciar resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu', next_id: 'specific_device_check_ip_settings' }
        ]
    },
    specific_device_check_ip_settings: {
        id: 'specific_device_check_ip_settings',
        text: 'Verifique as configurações de rede do dispositivo. Ele está a obter um endereço IP válido (geralmente algo como 192.168.x.x)? As configurações de DNS estão automáticas ou corretas?',
        details: 'Pode encontrar isto nas Definições de Rede ou Wi-Fi do dispositivo. Procure por "Obter IP automaticamente" e "Obter DNS automaticamente".',
        options: [
            { text: 'Sim, as configurações parecem corretas (IP válido, DNS automático)', next_id: 'specific_device_update_drivers' },
            { text: 'Não, não tem IP ou as configurações estão manuais e podem estar erradas', next_id: 'solution_specific_device_fix_ip_settings' }
        ]
    },
    solution_specific_device_fix_ip_settings: {
        id: 'solution_specific_device_fix_ip_settings',
        text: 'Ajuste as configurações de IP/DNS.',
        details: 'Configure o dispositivo para obter um endereço IP e servidor DNS automaticamente (via DHCP). Se precisar de IP estático, garanta que está correto e fora da gama DHCP do router, e que o gateway e DNS estão corretos.',
        options: [
            { text: 'Ajustar configurações resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu', next_id: 'specific_device_update_drivers' }
        ]
    },
    specific_device_update_drivers: {
        id: 'specific_device_update_drivers',
        text: 'Se for um computador, verifique se os controladores (drivers) da placa de rede (Wi-Fi ou Ethernet) estão atualizados.',
        details: 'Drivers desatualizados ou corrompidos podem causar problemas. Visite o site do fabricante do computador ou da placa de rede.',
        options: [
            { text: 'Atualizar/reinstalar drivers resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu ou não aplicável (ex: smartphone)', next_id: 'specific_device_check_security_software' }
        ]
    },
    specific_device_check_security_software: {
        id: 'specific_device_check_security_software',
        text: 'Verifique se algum software de segurança (antivírus, firewall) no dispositivo está a bloquear a ligação à internet.',
        details: 'Tente desativar temporariamente estes softwares para testar. Lembre-se de os reativar depois.',
        options: [
            { text: 'Era o software de segurança!', next_id: 'end_thank_you' },
            { text: 'Não era isso', next_id: 'solution_specific_device_hardware_problem' }
        ]
    },
    specific_device_ethernet_check_cable: {
        id: 'specific_device_ethernet_check_cable',
        text: 'Se estiver a usar um cabo Ethernet: \n1. Verifique se o cabo está bem ligado em ambas as pontas (dispositivo e router). \n2. Tente usar um cabo Ethernet diferente. \n3. Tente ligar a uma porta Ethernet diferente no router.',
        options: [
            { text: 'Trocar cabo/porta resolveu!', next_id: 'end_thank_you' },
            { text: 'Não resolveu', next_id: 'specific_device_reboot_device' } // Continua com os passos gerais para dispositivo específico
        ]
    },
    solution_specific_device_hardware_problem: {
        id: 'solution_specific_device_hardware_problem',
        text: 'Problema no dispositivo específico persiste.',
        details: 'Se todos os passos foram tentados, pode haver um problema de hardware com a placa de rede do dispositivo ou uma questão de software mais complexa (ex: sistema operativo corrompido). Considere procurar assistência técnica para este dispositivo.',
        options: [
            { text: 'Entendido, vou procurar ajuda especializada', next_id: 'end_thank_you_research' },
            { text: 'Voltar ao início', next_id: 'start' }
        ]
    },

    // End States
    end_thank_you: {
        id: 'end_thank_you',
        text: '🎉 Excelente! Parece que o problema foi resolvido.',
        details: 'Se precisar de mais ajuda ou enfrentar outro problema, pode reiniciar o diagnóstico.',
        options: [{ text: 'Reiniciar Diagnóstico', next_id: 'start' }]
    },
    end_thank_you_isp: {
        id: 'end_thank_you_isp',
        text: '✅ Entendido.',
        details: 'Esperamos que o seu Provedor de Internet (ISP) consiga resolver a questão rapidamente. Pode reiniciar o diagnóstico se surgirem novos problemas.',
        options: [{ text: 'Reiniciar Diagnóstico', next_id: 'start' }]
    },
    end_thank_you_research: {
        id: 'end_thank_you_research',
        text: '👍 Certo!',
        details: 'Boa sorte com as próximas verificações. Pode reiniciar o diagnóstico se precisar.',
        options: [{ text: 'Reiniciar Diagnóstico', next_id: 'start' }]
    },
    solution_contact_isp: {
        id: 'solution_contact_isp',
        text: 'Contacte o seu Provedor de Internet (ISP).',
        details: 'Se as luzes do modem/router indicam um problema que não consegue resolver com reinícios ou verificação de cabos, é provável que precise da assistência do seu ISP.',
        options: [{ text: 'Entendido, vou contactar o ISP', next_id: 'end_thank_you_isp' }]
    }
};