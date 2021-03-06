package co.com.meerkats.ucosports.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import co.com.meerkats.ucosports.domain.dto.PlayerDTO;
import co.com.meerkats.ucosports.logical.Impl.PlayerLogicalImpl;
import co.com.meerkats.ucosports.rest.PlayerServiceRest;

@RunWith(MockitoJUnitRunner.class)
public class PlayerServiceRestTest {
	
	private static final int ID = 0;

	@InjectMocks
	private PlayerServiceRest service;
	
	@Mock
	private PlayerLogicalImpl logical;
	
	@Test
	public void verifyFindPlayer(){
		PlayerDTO playerDto = new PlayerDTO();
		playerDto.id = ID;
		service.getPlayerById(playerDto);
		Mockito.verify(logical).findPlayerById(ID);
	}
	
	@Test
	public void verifyGetAll(){
		service.getAllPlayers();
		Mockito.verify(logical).findAll();
	}
	
}
